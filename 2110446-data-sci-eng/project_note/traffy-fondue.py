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

import re # For cleaning text
from tqdm.notebook import tqdm # For progress bars (ensure you're in a notebook environment)

# --- Configuration ---
DATA_PATH = '/kaggle/input/traffy-fondue-dsde-chula-dataset/bangkok_traffy.csv'
MODEL_NAME = 'airesearch/wangchanberta-base-att-spm-uncased'
MAX_LEN = 256
BATCH_SIZE = 16
EPOCHS = 3
LEARNING_RATE = 2e-5
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# For reproducibility
SEED = 42

# USER CONFIGURABLE: Total expected raw data points (for informational purposes)
TOTAL_RAW_DATA_POINTS_INFO = 787026

# USER CONFIGURABLE: Desired sample size for training from the filtered data.
DATA_SAMPLE_SIZE = 50000

np.random.seed(SEED)
torch.manual_seed(SEED)
if torch.cuda.is_available():
    torch.cuda.manual_seed_all(SEED)

print(f"Using device: {DEVICE}")
print(f"Is CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"CUDA device name: {torch.cuda.get_device_name(0)}")
print(f"Configured DATA_SAMPLE_SIZE: {DATA_SAMPLE_SIZE if DATA_SAMPLE_SIZE is not None else 'All Available'}")

# --- 1. Data Loading and Initial Preprocessing ---
print("\n--- Loading Data ---")
try:
    df = pd.read_csv(DATA_PATH, low_memory=False)
except FileNotFoundError:
    print(f"CRITICAL ERROR: Data file not found at {DATA_PATH}")
    exit()
except Exception as e:
    print(f"CRITICAL ERROR: An unexpected error occurred while loading data: {e}")
    exit()

print(f"Initial raw dataframe shape: {df.shape}")
print(f"Reference total raw data points (as provided by user): {TOTAL_RAW_DATA_POINTS_INFO}")


# --- 2. Feature Engineering and Data Cleaning ---
print("\n--- Processing Data ---")

required_time_cols = ['timestamp', 'last_activity']
for col in required_time_cols:
    if col not in df.columns:
        print(f"CRITICAL WARNING: Expected datetime column '{col}' not found!")
        df[col] = pd.NaT
    else:
        df[col] = pd.to_datetime(df[col], errors='coerce')

df.dropna(subset=['timestamp'], inplace=True)
print(f"Shape after dropping rows with no creation 'timestamp': {df.shape}")

df_filtered = df[df['last_activity'].notna() & (df['last_activity'] > df['timestamp'])].copy()
print(f"Shape after filtering for valid 'last_activity': {df_filtered.shape}")

if not df_filtered.empty:
    df_filtered['duration'] = (df_filtered['last_activity'] - df_filtered['timestamp'])
    df_filtered['duration_hours'] = df_filtered['duration'].dt.total_seconds() / 3600.0
    df_filtered = df_filtered[df_filtered['duration_hours'] > 0]
    print(f"Shape after calculating positive 'duration_hours': {df_filtered.shape}")
else:
    print("Warning: df_filtered was empty before duration calculation. No valid time differences to process.")
    df_filtered['duration_hours'] = pd.Series(dtype='float64') # Ensure column exists even if empty


num_available_filtered_samples = len(df_filtered)
print(f"Number of available samples after initial filtering & duration calculation: {num_available_filtered_samples}")

if df_filtered.empty:
    print("CRITICAL WARNING: No data left after initial filtering and duration calculation.")
    print("Model cannot be trained. Creating dummy data to allow script structure to run.")
    dummy_data_dict = {
        'ticket_id': ['dummy_001'], 'type': ['dummy_type'], 'organization': ['dummy_org'],
        'comment': ['dummy problem'], 'address': ['dummy address'], 'subdistrict': ['dummy_sub'],
        'district': ['dummy_dist'], 'province': ['Bangkok'],
        'timestamp': [pd.Timestamp('2023-01-01 00:00:00')],
        'last_activity': [pd.Timestamp('2023-01-01 10:00:00')],
        'duration_hours': [10.0], 'state': ['เสร็จสิ้น']
    }
    for col_key in ['combined_text', 'duration_scaled']: dummy_data_dict[col_key] = [0.0 if col_key == 'duration_scaled' else 'dummy']
    df_filtered = pd.DataFrame(dummy_data_dict)
    num_available_filtered_samples = len(df_filtered)
    print(f"Using dummy DataFrame. Shape: {df_filtered.shape}")


if DATA_SAMPLE_SIZE is not None and num_available_filtered_samples > 0 and DATA_SAMPLE_SIZE < num_available_filtered_samples:
    print(f"\n--- Down-sampling data from {num_available_filtered_samples} to {DATA_SAMPLE_SIZE} samples ---")
    
    if 'duration_hours' not in df_filtered.columns or df_filtered['duration_hours'].empty:
        print("Warning: 'duration_hours' column is missing or empty. Performing simple random sampling.")
        df_filtered = df_filtered.sample(n=min(DATA_SAMPLE_SIZE, num_available_filtered_samples), random_state=SEED, replace=False)
    else:
        num_bins = 10 
        can_stratify = False
        if df_filtered['duration_hours'].nunique() >= num_bins and len(df_filtered) >= num_bins:
            try:
                df_filtered['duration_bin'] = pd.qcut(df_filtered['duration_hours'], q=num_bins, labels=False, duplicates='drop')
                can_stratify = True
            except ValueError as e:
                print(f"Warning: pd.qcut failed for creating stratification bins ({e}). Will use simple random sampling.")
        else:
            print(f"Warning: Not enough unique 'duration_hours' values ({df_filtered['duration_hours'].nunique()}) for {num_bins} bins, or too few samples ({len(df_filtered)}). Will use simple random sampling.")

        if can_stratify:
            try:
                sampled_df, _ = train_test_split(
                    df_filtered,
                    train_size=min(DATA_SAMPLE_SIZE, len(df_filtered)), 
                    stratify=df_filtered['duration_bin'],
                    random_state=SEED
                )
                df_filtered = sampled_df
                print(f"Successfully performed stratified sampling. New shape: {df_filtered.shape}")
            except ValueError as e:
                print(f"Warning: Stratified sampling failed ({e}). Falling back to simple random sampling.")
                df_filtered = df_filtered.sample(n=min(DATA_SAMPLE_SIZE, num_available_filtered_samples), random_state=SEED, replace=False)
        else: 
            print("Performing simple random sampling.")
            df_filtered = df_filtered.sample(n=min(DATA_SAMPLE_SIZE, num_available_filtered_samples), random_state=SEED, replace=False)
        
        if 'duration_bin' in df_filtered.columns:
            df_filtered = df_filtered.drop(columns=['duration_bin'])

    print(f"Shape after down-sampling: {df_filtered.shape}")

elif DATA_SAMPLE_SIZE is not None and num_available_filtered_samples > 0 and DATA_SAMPLE_SIZE >= num_available_filtered_samples:
    print(f"\nRequested sample size ({DATA_SAMPLE_SIZE}) is >= available filtered samples ({num_available_filtered_samples}). Using all available {num_available_filtered_samples} filtered samples.")
elif num_available_filtered_samples == 0:
    print(f"\nNo samples available after filtering. Down-sampling step skipped (using dummy data if created).")
else: 
    print(f"\nUsing all {num_available_filtered_samples} available filtered samples (DATA_SAMPLE_SIZE not set for down-sampling).")


text_feature_cols = ['type', 'organization', 'comment', 'address', 'subdistrict', 'district', 'province']
for col in text_feature_cols:
    if col not in df_filtered.columns:
        df_filtered[col] = '' 
    else:
        df_filtered[col] = df_filtered[col].fillna('').astype(str)

def clean_text(text):
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    text = text.replace('{', '').replace('}', '')
    return text

df_filtered['combined_text'] = (
    "ประเภท: " + df_filtered['type'].apply(clean_text) +
    " | หน่วยงาน: " + df_filtered['organization'].apply(clean_text) +
    " | ปัญหา: " + df_filtered['comment'].apply(clean_text) +
    " | ที่อยู่: " + df_filtered['address'].apply(clean_text) +
    " | แขวง: " + df_filtered['subdistrict'].apply(clean_text) +
    " | เขต: " + df_filtered['district'].apply(clean_text)
)

print("\nSample of combined text and duration_hours (first 5 rows of potentially sampled data):")
print(df_filtered[['combined_text', 'duration_hours']].head())

scaler = MinMaxScaler()
if 'duration_hours' in df_filtered.columns and not df_filtered['duration_hours'].empty and df_filtered['duration_hours'].notna().all() and len(df_filtered['duration_hours']) > 1 :
    df_filtered['duration_scaled'] = scaler.fit_transform(df_filtered[['duration_hours']])
    print("\nDuration scaled (sample):")
    print(df_filtered[['duration_hours', 'duration_scaled']].head())
else:
    print("Warning: 'duration_hours' column is problematic, empty, or has insufficient data for scaling.")
    if 'duration_hours' in df_filtered.columns and not df_filtered['duration_hours'].empty:
        df_filtered['duration_scaled'] = df_filtered['duration_hours'] 
    else: 
        df_filtered['duration_scaled'] = 0.0 
        if 'duration_hours' not in df_filtered.columns: df_filtered['duration_hours'] = 0.0

    class DummyScaler: 
        def fit_transform(self, data): return data
        def inverse_transform(self, data): return data
    scaler = DummyScaler()
    print("Using a dummy/passthrough scaler as scaling could not be properly performed.")


if df_filtered.empty or 'combined_text' not in df_filtered.columns or 'duration_scaled' not in df_filtered.columns:
    print("CRITICAL ERROR: Dataframe is empty or essential columns missing before splitting. Exiting.")
    exit()

if len(df_filtered) > 1:
    train_df, val_df = train_test_split(
        df_filtered, test_size=0.15, random_state=SEED
    )
else:
    print("Warning: Very few samples (<2) for train/val split. Using all for training and duplicating for validation.")
    train_df = df_filtered.copy()
    val_df = df_filtered.copy()

print(f"\nTrain set shape: {train_df.shape}")
print(f"Validation set shape: {val_df.shape}")


print("\n--- Initializing Tokenizer & Datasets ---")
try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
except Exception as e:
    print(f"Error loading tokenizer {MODEL_NAME}: {e}. Attempting fallback.")
    try:
        MODEL_NAME_FALLBACK = 'bert-base-multilingual-cased'
        tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME_FALLBACK)
        MODEL_NAME = MODEL_NAME_FALLBACK
    except Exception as e_fallback:
        print(f"CRITICAL ERROR: Fallback tokenizer also failed: {e_fallback}")
        exit()

class TraffyDataset(Dataset):
    def __init__(self, dataframe, tokenizer, max_len):
        self.tokenizer = tokenizer
        self.texts = dataframe['combined_text'].values if 'combined_text' in dataframe else np.array(['dummy text'] * len(dataframe))
        self.targets = dataframe['duration_scaled'].values if 'duration_scaled' in dataframe else np.array([0.0] * len(dataframe))
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, index):
        text = str(self.texts[index])
        target = self.targets[index]
        encoding = self.tokenizer.encode_plus(
            text, add_special_tokens=True, max_length=self.max_len,
            return_token_type_ids=False, padding='max_length', truncation=True,
            return_attention_mask=True, return_tensors='pt',
        )
        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'targets': torch.tensor(target, dtype=torch.float)
        }

if not train_df.empty:
    train_dataset = TraffyDataset(train_df, tokenizer, MAX_LEN)
    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=2 if DEVICE.type == 'cuda' else 0)
else:
    print("Warning: Train dataframe is empty. Creating a dummy train_loader.")
    train_loader = DataLoader(TraffyDataset(pd.DataFrame({'combined_text': ['empty train'], 'duration_scaled': [0.0]}), tokenizer, MAX_LEN), batch_size=1)

if not val_df.empty:
    val_dataset = TraffyDataset(val_df, tokenizer, MAX_LEN)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=2 if DEVICE.type == 'cuda' else 0)
else:
    print("Warning: Validation dataframe is empty. Creating a dummy val_loader.")
    val_loader = DataLoader(TraffyDataset(pd.DataFrame({'combined_text': ['empty val'], 'duration_scaled': [0.0]}), tokenizer, MAX_LEN), batch_size=1)

class TraffyBertRegressor(nn.Module):
    def __init__(self, model_name_or_path):
        super(TraffyBertRegressor, self).__init__()
        try:
            self.bert = AutoModel.from_pretrained(model_name_or_path)
        except Exception as e:
            print(f"Error loading model {model_name_or_path}: {e}")
            raise e
        self.dropout = nn.Dropout(0.1)
        self.regressor = nn.Linear(self.bert.config.hidden_size, 1)

    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        pooled_output = outputs.last_hidden_state[:, 0, :]
        pooled_output = self.dropout(pooled_output)
        return self.regressor(pooled_output)

print("\n--- Initializing Model ---")
model = TraffyBertRegressor(MODEL_NAME)
model.to(DEVICE)

optimizer = AdamW(model.parameters(), lr=LEARNING_RATE, eps=1e-8)
if len(train_loader.dataset) > 1 or (hasattr(train_loader.dataset, 'texts') and train_loader.dataset.texts[0] != 'empty train'):
    total_steps = len(train_loader) * EPOCHS
else:
    total_steps = 1 * EPOCHS 
    print("Warning: train_loader seems to be dummy or empty, total_steps for scheduler set to minimal.")


scheduler = get_linear_schedule_with_warmup(
    optimizer, num_warmup_steps=int(0.1 * total_steps) if total_steps > 0 else 0,
    num_training_steps=total_steps if total_steps > 0 else 1 
)
criterion = nn.MSELoss()

def train_epoch_fn(model, data_loader, loss_fn, optimizer, device, scheduler):
    model.train()
    total_loss = 0
    if len(data_loader.dataset) == 0 or (hasattr(data_loader.dataset, 'texts') and len(data_loader.dataset.texts) > 0 and data_loader.dataset.texts[0] in ['empty train', 'empty val']):
        print("Skipping training epoch due to dummy/empty dataloader.")
        return 0.0

    for batch in tqdm(data_loader, desc="Training Epoch", leave=False):
        input_ids = batch["input_ids"].to(device)
        attention_mask = batch["attention_mask"].to(device)
        targets = batch["targets"].to(device).unsqueeze(1)
        optimizer.zero_grad()
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        loss = loss_fn(outputs, targets)
        total_loss += loss.item()
        loss.backward()
        nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        optimizer.step()
        scheduler.step() # MODIFIED HERE
    return total_loss / len(data_loader) if len(data_loader) > 0 else 0.0


def eval_model_fn(model, data_loader, loss_fn, device, current_scaler):
    model.eval()
    total_loss = 0
    all_targets_orig, all_predictions_orig = [], []

    if len(data_loader.dataset) == 0 or (hasattr(data_loader.dataset, 'texts') and len(data_loader.dataset.texts) > 0 and data_loader.dataset.texts[0] in ['empty train', 'empty val']):
        print("Skipping evaluation due to dummy/empty dataloader.")
        return 0.0, 0.0, 0.0 

    with torch.no_grad():
        for batch in tqdm(data_loader, desc="Evaluating Epoch", leave=False):
            input_ids = batch["input_ids"].to(device)
            attention_mask = batch["attention_mask"].to(device)
            targets_scaled = batch["targets"].to(device).unsqueeze(1)
            outputs_scaled = model(input_ids=input_ids, attention_mask=attention_mask)
            loss = loss_fn(outputs_scaled, targets_scaled)
            total_loss += loss.item()
            targets_s_cpu, outputs_s_cpu = targets_scaled.cpu().numpy(), outputs_scaled.cpu().numpy()
            if hasattr(current_scaler, 'inverse_transform') and hasattr(current_scaler, 'scale_'):
                try:
                    all_targets_orig.extend(current_scaler.inverse_transform(targets_s_cpu).flatten())
                    all_predictions_orig.extend(current_scaler.inverse_transform(outputs_s_cpu).flatten())
                except: 
                    all_targets_orig.extend(targets_s_cpu.flatten())
                    all_predictions_orig.extend(outputs_s_cpu.flatten())
            else:
                all_targets_orig.extend(targets_s_cpu.flatten())
                all_predictions_orig.extend(outputs_s_cpu.flatten())
    avg_loss = total_loss / len(data_loader) if len(data_loader) > 0 else 0.0
    if not all_targets_orig or not all_predictions_orig: return avg_loss, 0, 0
    mae = mean_absolute_error(all_targets_orig, all_predictions_orig)
    rmse = np.sqrt(mean_squared_error(all_targets_orig, all_predictions_orig))
    return avg_loss, mae, rmse

print("\n--- Starting Training ---")
best_val_mae = float('inf')
history = {'train_loss': [], 'val_loss': [], 'val_mae': [], 'val_rmse': []}

if len(train_loader.dataset) <= 1 and (hasattr(train_loader.dataset, 'texts') and train_loader.dataset.texts[0] == 'empty train'):
    print("CRITICAL: Training data is effectively empty or dummy. Actual training loop will be skipped.")
else:
    for epoch in range(EPOCHS):
        print(f'\nEpoch {epoch + 1}/{EPOCHS}')
        train_loss = train_epoch_fn(model, train_loader, criterion, optimizer, DEVICE, scheduler)
        print(f'Train Loss: {train_loss:.4f}')
        val_loss, val_mae, val_rmse = eval_model_fn(model, val_loader, criterion, DEVICE, scaler)
        print(f'Val Loss: {val_loss:.4f}, Val MAE: {val_mae:.2f} hours, Val RMSE: {val_rmse:.2f} hours')
        history['train_loss'].append(train_loss); history['val_loss'].append(val_loss)
        history['val_mae'].append(val_mae); history['val_rmse'].append(val_rmse)
        if val_mae < best_val_mae :
            if val_mae == 0.0 and val_loss == 0.0 : 
                 print("Skipping model save due to MAE of 0.0 (likely dummy data evaluation).")
            else:
                print(f"Validation MAE improved ({best_val_mae:.2f} ---> {val_mae:.2f}). Saving model...")
                try: torch.save(model.state_dict(), 'best_model_state.bin'); best_val_mae = val_mae
                except Exception as e: print(f"Error saving model: {e}")


print("\n--- Training Finished ---")
if best_val_mae != float('inf') and best_val_mae > 0 : 
    print(f"Best Validation MAE: {best_val_mae:.2f} hours")
else:
    print("Model did not improve, training was skipped, or evaluation resulted in zero MAE (check data).")

if best_val_mae != float('inf') and best_val_mae > 0:
    model_path = 'best_model_state.bin'
    try:
        model.load_state_dict(torch.load(model_path, map_location=DEVICE))
        model.eval(); print("\nLoaded best model for sample prediction.")
        sample_text = "ประเภท: ถนน | หน่วยงาน: เขตจตุจักร | ปัญหา: ถนนเป็นหลุมบ่อ | ที่อยู่: ซอยวิภาวดีรังสิต 20"
        encoded_sample = tokenizer.encode_plus(
            sample_text, add_special_tokens=True, max_length=MAX_LEN,
            return_token_type_ids=False, padding='max_length', truncation=True,
            return_attention_mask=True, return_tensors='pt',
        )
        input_ids, attention_mask = encoded_sample['input_ids'].to(DEVICE), encoded_sample['attention_mask'].to(DEVICE)
        with torch.no_grad():
            pred_scaled = model(input_ids, attention_mask).cpu().numpy()
        if hasattr(scaler, 'inverse_transform') and hasattr(scaler, 'scale_'):
            try:
                pred_hours = scaler.inverse_transform(pred_scaled).flatten()[0]
                print(f"Sample Prediction for: '{sample_text}'\nPredicted duration: {pred_hours:.2f} hours (scaled: {pred_scaled.flatten()[0]:.4f})")
            except: print(f"Sample prediction (scaled only, inverse failed): {pred_scaled.flatten()[0]:.4f}")
        else: print(f"Sample prediction (scaled, no valid scaler for inverse): {pred_scaled.flatten()[0]:.4f}")
    except FileNotFoundError: print(f"\nBest model file '{model_path}' not found. Skipping prediction.")
    except Exception as e: print(f"\nError during sample prediction: {e}")
else: print("\nSkipping sample prediction: No best model saved or MAE indicates issues.")

print("\n--- Script Finished ---")