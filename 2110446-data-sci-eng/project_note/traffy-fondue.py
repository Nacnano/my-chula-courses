import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from transformers import AutoTokenizer, AutoModel, get_linear_schedule_with_warmup
from torch.optim import AdamW
import re
from tqdm.notebook import tqdm
import matplotlib.pyplot as plt
import seaborn as sns

# --- Configuration ---
DATA_PATH = '/kaggle/input/traffy-fondue-dsde-chula-dataset/bangkok_traffy.csv'
MODEL_NAME = 'distilbert-base-multilingual-cased'  # Lighter model
MAX_LEN = 128  # Reduced for faster training
BATCH_SIZE = 32  # Increased for stability
EPOCHS = 5  # More epochs with early stopping
LEARNING_RATE = 2e-5  # Slightly higher
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
SEED = 42
DATA_SAMPLE_SIZE = 50000

np.random.seed(SEED)
torch.manual_seed(SEED)
if torch.cuda.is_available():
    torch.cuda.manual_seed_all(SEED)

print(f"Using device: {DEVICE}")

# --- Data Loading and Preprocessing ---
print("\n--- Loading Data ---")
try:
    df = pd.read_csv(DATA_PATH, low_memory=False)
except FileNotFoundError:
    print(f"CRITICAL ERROR: Data file not found at {DATA_PATH}")
    exit()

# Filter resolved tickets
df = df[df['state'] == 'เสร็จสิ้น'].copy()
print(f"Shape after filtering resolved tickets: {df.shape}")

# Convert timestamps and filter for 2025
df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce').dt.tz_localize(None)
df['last_activity'] = pd.to_datetime(df['last_activity'], errors='coerce').dt.tz_localize(None)
df = df[df['timestamp'].dt.year == 2025]
df = df.dropna(subset=['timestamp', 'last_activity'])
df['duration_days'] = (df['last_activity'] - df['timestamp']).dt.total_seconds() / 86400
df = df[df['duration_days'] > 0]
print(f"Shape after filtering for 2025 and calculating positive durations: {df.shape}")

# Cap outliers at 95th percentile
upper_bound = df['duration_days'].quantile(0.95)
df = df[df['duration_days'] <= upper_bound]
print(f"Shape after capping durations at 95th percentile (~{upper_bound:.2f} days): {df.shape}")

# Text feature engineering
text_cols = ['type', 'organization', 'comment', 'address', 'subdistrict', 'district', 'province']
for col in text_cols:
    df[col] = df[col].fillna('').astype(str)

def clean_text(text):
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

df['combined_text'] = (
    "ประเภท: " + df['type'].apply(clean_text) +
    " | หน่วยงาน: " + df['organization'].apply(clean_text) +
    " | ปัญหา: " + df['comment'].apply(clean_text) +
    " | ที่อยู่: " + df['address'].apply(clean_text) +
    " | แขวง: " + df['subdistrict'].apply(clean_text) +
    " | เขต: " + df['district'].apply(clean_text)
)

# Additional features
df['issue_specificity'] = df['type'].apply(lambda x: 1 if x != '{}' else 0)
df['comment_length'] = df['comment'].str.len()
priority_types = ['ความปลอดภัย', 'จราจร']
df['is_priority'] = df['type'].apply(lambda x: 1 if any(t in x for t in priority_types) else 0)
top_orgs = df['organization'].value_counts().head(10).index
df['organization_encoded'] = df['organization'].apply(lambda x: x if x in top_orgs else 'Other')
df = pd.get_dummies(df, columns=['organization_encoded'], prefix='org')

# Temporal features
df['creation_month'] = df['timestamp'].dt.month
df['day_of_week'] = df['timestamp'].dt.dayofweek

# Drop rows with empty comments
df = df[df['comment'].str.strip() != '']
print(f"Shape after dropping empty comments: {df.shape}")

# Train-validation split (use all data since it's small)
train_df, val_df = train_test_split(df, test_size=0.15, random_state=SEED)
print(f"Train set shape: {train_df.shape}")
print(f"Validation set shape: {val_df.shape}")

# Scale numerical features
duration_scaler = MinMaxScaler()
train_df['duration_scaled'] = duration_scaler.fit_transform(train_df[['duration_days']])
val_df['duration_scaled'] = duration_scaler.transform(val_df[['duration_days']])
length_scaler = MinMaxScaler()
train_df['comment_length_scaled'] = length_scaler.fit_transform(train_df[['comment_length']])
val_df['comment_length_scaled'] = length_scaler.transform(val_df[['comment_length']])

# --- Dataset and DataLoader ---
class TraffyDataset(Dataset):
    def __init__(self, dataframe, tokenizer, max_len):
        self.tokenizer = tokenizer
        self.texts = dataframe['combined_text'].values
        self.targets = dataframe['duration_scaled'].values
        self.specificity = dataframe['issue_specificity'].values
        self.comment_length = dataframe['comment_length_scaled'].values
        self.is_priority = dataframe['is_priority'].values
        self.creation_month = dataframe['creation_month'].values
        self.day_of_week = dataframe['day_of_week'].values
        self.org_features = dataframe[[col for col in dataframe.columns if col.startswith('org_')]].values
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, index):
        text = str(self.texts[index])
        encoding = self.tokenizer.encode_plus(
            text, add_special_tokens=True, max_length=self.max_len,
            return_token_type_ids=False, padding='max_length', truncation=True,
            return_attention_mask=True, return_tensors='pt'
        )
        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'targets': torch.tensor(self.targets[index], dtype=torch.float),
            'specificity': torch.tensor(self.specificity[index], dtype=torch.float),
            'comment_length': torch.tensor(self.comment_length[index], dtype=torch.float),
            'is_priority': torch.tensor(self.is_priority[index], dtype=torch.float),
            'creation_month': torch.tensor(self.creation_month[index], dtype=torch.float),
            'day_of_week': torch.tensor(self.day_of_week[index], dtype=torch.float),
            'org_features': torch.tensor(self.org_features[index], dtype=torch.float)
        }

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
train_dataset = TraffyDataset(train_df, tokenizer, MAX_LEN)
train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
val_dataset = TraffyDataset(val_df, tokenizer, MAX_LEN)
val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False)

# --- Model ---
class TraffyBertRegressor(nn.Module):
    def __init__(self, model_name, num_org_features):
        super(TraffyBertRegressor, self).__init__()
        self.bert = AutoModel.from_pretrained(model_name)
        self.dropout = nn.Dropout(0.3)
        self.dense = nn.Linear(self.bert.config.hidden_size + 5 + num_org_features, 64)
        self.relu = nn.ReLU()
        self.regressor = nn.Linear(64, 1)

    def forward(self, input_ids, attention_mask, specificity, comment_length, is_priority, creation_month, day_of_week, org_features):
        bert_outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        pooled_output = bert_outputs.last_hidden_state[:, 0, :]
        pooled_output = self.dropout(pooled_output)
        combined = torch.cat(
            (pooled_output, specificity.unsqueeze(1), comment_length.unsqueeze(1), is_priority.unsqueeze(1),
             creation_month.unsqueeze(1), day_of_week.unsqueeze(1), org_features),
            dim=1
        )
        dense_output = self.relu(self.dense(combined))
        return self.regressor(dense_output)

num_org_features = len([col for col in train_df.columns if col.startswith('org_')])
model = TraffyBertRegressor(MODEL_NAME, num_org_features)
model.to(DEVICE)

# --- Training Setup ---
optimizer = AdamW(model.parameters(), lr=LEARNING_RATE, eps=1e-8)
total_steps = len(train_loader) * EPOCHS
scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=0.1 * total_steps, num_training_steps=total_steps)
criterion = nn.MSELoss()

def train_epoch(model, data_loader, loss_fn, optimizer, device, scheduler):
    model.train()
    total_loss = 0
    for batch in tqdm(data_loader, desc="Training"):
        input_ids = batch['input_ids'].to(device)
        attention_mask = batch['attention_mask'].to(device)
        specificity = batch['specificity'].to(device)
        comment_length = batch['comment_length'].to(device)
        is_priority = batch['is_priority'].to(device)
        creation_month = batch['creation_month'].to(device)
        day_of_week = batch['day_of_week'].to(device)
        org_features = batch['org_features'].to(device)
        targets = batch['targets'].to(device).unsqueeze(1)
        optimizer.zero_grad()
        outputs = model(input_ids, attention_mask, specificity, comment_length, is_priority, creation_month, day_of_week, org_features)
        loss = loss_fn(outputs, targets)
        total_loss += loss.item()
        loss.backward()
        nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        optimizer.step()
        scheduler.step()
    return total_loss / len(data_loader)

def eval_model(model, data_loader, loss_fn, device, scaler):
    model.eval()
    total_loss = 0
    all_targets, all_predictions = [], []
    with torch.no_grad():
        for batch in tqdm(data_loader, desc="Evaluating"):
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            specificity = batch['specificity'].to(device)
            comment_length = batch['comment_length'].to(device)
            is_priority = batch['is_priority'].to(device)
            creation_month = batch['creation_month'].to(device)
            day_of_week = batch['day_of_week'].to(device)
            org_features = batch['org_features'].to(device)
            targets = batch['targets'].to(device).unsqueeze(1)
            outputs = model(input_ids, attention_mask, specificity, comment_length, is_priority, creation_month, day_of_week, org_features)
            loss = loss_fn(outputs, targets)
            total_loss += loss.item()
            all_targets.extend(scaler.inverse_transform(targets.cpu().numpy()).flatten())
            all_predictions.extend(scaler.inverse_transform(outputs.cpu().numpy()).flatten())
    avg_loss = total_loss / len(data_loader)
    mae = mean_absolute_error(all_targets, all_predictions)
    rmse = np.sqrt(mean_squared_error(all_targets, all_predictions))
    return avg_loss, mae, rmse

# --- Training Loop with Early Stopping ---
print("\n--- Starting Training ---")
best_val_mae = float('inf')
patience = 2
no_improve = 0
for epoch in range(EPOCHS):
    print(f'\nEpoch {epoch + 1}/{EPOCHS}')
    train_loss = train_epoch(model, train_loader, criterion, optimizer, DEVICE, scheduler)
    val_loss, val_mae, val_rmse = eval_model(model, val_loader, criterion, DEVICE, duration_scaler)
    print(f'Train Loss: {train_loss:.4f}, Val Loss: {val_loss:.4f}, Val MAE: {val_mae:.2f} days, Val RMSE: {val_rmse:.2f} days')
    if val_mae < best_val_mae:
        torch.save(model.state_dict(), 'best_model_state.bin')
        best_val_mae = val_mae
        no_improve = 0
    else:
        no_improve += 1
        if no_improve >= patience:
            print("Early stopping triggered.")
            break

# --- Visualization ---
model.load_state_dict(torch.load('best_model_state.bin', map_location=DEVICE))
model.eval()
all_targets, all_predictions = [], []
with torch.no_grad():
    for batch in val_loader:
        input_ids = batch['input_ids'].to(DEVICE)
        attention_mask = batch['attention_mask'].to(DEVICE)
        specificity = batch['specificity'].to(DEVICE)
        comment_length = batch['comment_length'].to(DEVICE)
        is_priority = batch['is_priority'].to(DEVICE)
        creation_month = batch['creation_month'].to(DEVICE)
        day_of_week = batch['day_of_week'].to(DEVICE)
        org_features = batch['org_features'].to(DEVICE)
        targets = batch['targets'].to(DEVICE).unsqueeze(1)
        outputs = model(input_ids, attention_mask, specificity, comment_length, is_priority, creation_month, day_of_week, org_features)
        all_targets.extend(duration_scaler.inverse_transform(targets.cpu().numpy()).flatten())
        all_predictions.extend(duration_scaler.inverse_transform(outputs.cpu().numpy()).flatten())

plt.figure(figsize=(8, 8))
sns.scatterplot(x=all_targets, y=all_predictions, alpha=0.6)
plt.plot([min(all_targets), max(all_targets)], [min(all_targets), max(all_targets)], 'r--')
plt.title('Actual vs. Predicted Duration (Days)')
plt.xlabel('Actual Duration (Days)')
plt.ylabel('Predicted Duration (Days)')
plt.grid(True)
plt.savefig('scatter_plot.png')