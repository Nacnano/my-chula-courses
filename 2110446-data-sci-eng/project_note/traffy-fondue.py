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
MAX_LEN = 256  # Max sequence length for BERT input
BATCH_SIZE = 16 # Adjust based on GPU memory (16 or 32 often works for 'base' models on P100/T4)
EPOCHS = 3     # Start with a few epochs; increase based on validation performance
LEARNING_RATE = 2e-5
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# For reproducibility
SEED = 42
np.random.seed(SEED)
torch.manual_seed(SEED)
if torch.cuda.is_available():
    torch.cuda.manual_seed_all(SEED)

print(f"Using device: {DEVICE}")
print(f"Is CUDA available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"CUDA device name: {torch.cuda.get_device_name(0)}")

# --- 1. Data Loading and Initial Preprocessing ---
print("\n--- Loading Data ---")
try:
    df = pd.read_csv(DATA_PATH, low_memory=False) # low_memory=False can help with mixed types
except FileNotFoundError:
    print(f"CRITICAL ERROR: Data file not found at {DATA_PATH}")
    print("Please ensure the Kaggle dataset is correctly attached and the path is accurate.")
    print("You might need to find the dataset in Kaggle's data tab and copy its exact path.")
    exit()
except Exception as e:
    print(f"CRITICAL ERROR: An unexpected error occurred while loading data: {e}")
    exit()


print(f"Initial dataframe shape: {df.shape}")
print(f"Columns: {df.columns.tolist()}")

# Display a small sample to verify columns
print("\nSample data (first 5 rows):")
print(df.head())
# print("\nData info:")
# df.info() # Can be very verbose for large datasets

print("\nMissing values summary (before processing):")
# Show only columns with missing values for brevity if many columns
missing_summary = df.isnull().sum()
print(missing_summary[missing_summary > 0])


# --- 2. Feature Engineering and Data Cleaning ---
print("\n--- Processing Data ---")

# Convert timestamp columns to datetime objects
# Ensure your column names 'timestamp' and 'last_activity' are correct.
# The problem description uses these names.
required_time_cols = ['timestamp', 'last_activity']
for col in required_time_cols:
    if col not in df.columns:
        print(f"CRITICAL WARNING: Expected datetime column '{col}' not found in the dataset!")
        print(f"Available columns: {df.columns.tolist()}")
        print("The script might fail or produce incorrect results. Please verify column names.")
        # Create dummy columns if missing to prevent immediate crashes, but this is a data issue
        df[col] = pd.NaT
    else:
        df[col] = pd.to_datetime(df[col], errors='coerce')

# Drop rows where essential 'timestamp' (creation time) couldn't be parsed or is missing
df.dropna(subset=['timestamp'], inplace=True)
print(f"Shape after dropping rows with no creation 'timestamp': {df.shape}")

# Filter for relevant data:
# 1. 'last_activity' must be present.
# 2. 'last_activity' must be after 'timestamp'.
# Note: Consider filtering by 'state' == 'เสร็จสิ้น' (or equivalent for "solved")
# if that column is reliable. This would be a more robust way to identify completed tasks.
# For example: df_filtered = df[df['state'] == 'เสร็จสิ้น'].copy()
# Then, proceed with duration calculation only on these.
# For now, relying on last_activity > timestamp.

df_filtered = df[df['last_activity'].notna() & (df['last_activity'] > df['timestamp'])].copy()
print(f"Shape after filtering for valid 'last_activity': {df_filtered.shape}")

if df_filtered.empty:
    print("CRITICAL WARNING: No rows found after filtering for 'last_activity' > 'timestamp'.")
    print("This means either all 'last_activity' are missing, not parseable, or not after 'timestamp'.")
    print("The model cannot be trained without valid target durations.")
    print("Consider checking the 'state' column or the raw 'last_activity' data.")
    # Create a dummy entry to allow script structure to run, but this needs to be fixed.
    dummy_data = {
        'ticket_id': ['dummy_001'], 'type': ['dummy_type'], 'organization': ['dummy_org'],
        'comment': ['dummy problem'], 'address': ['dummy address'], 'subdistrict': ['dummy_sub'],
        'district': ['dummy_dist'], 'province': ['Bangkok'],
        'timestamp': [pd.Timestamp('2023-01-01 00:00:00')],
        'last_activity': [pd.Timestamp('2023-01-01 10:00:00')],
        'state': ['เสร็จสิ้น'] # Example
    }
    df_filtered = pd.DataFrame(dummy_data)
    print(f"Created a dummy DataFrame with shape: {df_filtered.shape} to proceed with script structure.")


# Calculate 'duration_hours'
df_filtered['duration'] = (df_filtered['last_activity'] - df_filtered['timestamp'])
df_filtered['duration_hours'] = df_filtered['duration'].dt.total_seconds() / 3600.0

# Filter out negative or zero durations (should be handled by 'last_activity > timestamp' but as a safeguard)
df_filtered = df_filtered[df_filtered['duration_hours'] > 0]
print(f"Shape after calculating duration_hours and ensuring it's positive: {df_filtered.shape}")

if df_filtered.empty:
    print("CRITICAL WARNING: No data left after calculating and filtering 'duration_hours'.")
    print("This indicates a serious issue with the timestamp data or the filtering logic.")
    # Re-create dummy if it became empty again
    dummy_data = {
        'ticket_id': ['dummy_001'], 'type': ['dummy_type'], 'organization': ['dummy_org'],
        'comment': ['dummy problem'], 'address': ['dummy address'], 'subdistrict': ['dummy_sub'],
        'district': ['dummy_dist'], 'province': ['Bangkok'],
        'timestamp': [pd.Timestamp('2023-01-01 00:00:00')],
        'last_activity': [pd.Timestamp('2023-01-01 10:00:00')],
        'duration': [pd.Timedelta(hours=10)], 'duration_hours': [10.0], 'state': ['เสร็จสิ้น']
    }
    df_filtered = pd.DataFrame(dummy_data)
    print(f"Re-created a dummy DataFrame with shape: {df_filtered.shape}.")


# Define text columns to combine and handle missing values
text_feature_cols = ['type', 'organization', 'comment', 'address', 'subdistrict', 'district', 'province']
for col in text_feature_cols:
    if col not in df_filtered.columns:
        print(f"Warning: Text feature column '{col}' not found. It will be ignored for combined_text.")
        df_filtered[col] = '' # Add as empty if missing to prevent key errors later
    else:
        df_filtered[col] = df_filtered[col].fillna('').astype(str)


# Clean and combine text features
def clean_text(text):
    text = re.sub(r"http\S+", "", text) # Remove URLs
    text = re.sub(r"\s+", " ", text).strip() # Remove extra whitespace, newlines
    text = text.replace('{', '').replace('}', '') # Remove braces if they are artifacts from 'type'
    return text

df_filtered['combined_text'] = (
    "ประเภท: " + df_filtered['type'].apply(clean_text) +
    " | หน่วยงาน: " + df_filtered['organization'].apply(clean_text) +
    " | ปัญหา: " + df_filtered['comment'].apply(clean_text) +
    " | ที่อยู่: " + df_filtered['address'].apply(clean_text) +
    " | แขวง: " + df_filtered['subdistrict'].apply(clean_text) +
    " | เขต: " + df_filtered['district'].apply(clean_text)
)

print("\nSample of combined text and duration_hours (first 5):")
print(df_filtered[['combined_text', 'duration_hours']].head())


# Target variable: duration_hours
# Normalize the target variable for potentially better training
scaler = MinMaxScaler()
if not df_filtered.empty and 'duration_hours' in df_filtered.columns and df_filtered['duration_hours'].notna().all() and len(df_filtered['duration_hours']) > 1 :
    df_filtered['duration_scaled'] = scaler.fit_transform(df_filtered[['duration_hours']])
    print("\nDuration scaled (sample):")
    print(df_filtered[['duration_hours', 'duration_scaled']].head())
else:
    print("Warning: 'duration_hours' column is problematic, empty, or has insufficient data for scaling.")
    print("Using unscaled duration_hours as duration_scaled, or a dummy value if duration_hours is missing.")
    if 'duration_hours' in df_filtered.columns and not df_filtered['duration_hours'].empty:
        df_filtered['duration_scaled'] = df_filtered['duration_hours']
    else:
        df_filtered['duration_scaled'] = 0.0 # Dummy value
        df_filtered['duration_hours'] = 0.0 # Ensure this column exists if it was problematic
        # Create a dummy scaler that does nothing
        class DummyScaler:
            def fit_transform(self, data): return data
            def inverse_transform(self, data): return data
        scaler = DummyScaler()
        print("Using a dummy scaler as scaling could not be performed.")


if df_filtered.empty or 'combined_text' not in df_filtered.columns or 'duration_scaled' not in df_filtered.columns:
    print("CRITICAL ERROR: Dataframe is empty or essential columns ('combined_text', 'duration_scaled') are missing before splitting.")
    exit()

# Split data
if len(df_filtered) > 1: # Need at least 2 samples to split
    train_df, val_df = train_test_split(
        df_filtered,
        test_size=0.15, # 15% for validation
        random_state=SEED,
        # Stratify if you had binned durations, not typical for direct regression on continuous target
    )
else: # Handle cases with only 1 sample after filtering (e.g. if dummy data was the only thing left)
    print("Warning: Very few samples available (<2). Using all for training and creating a duplicate for validation for script flow.")
    train_df = df_filtered.copy()
    val_df = df_filtered.copy() # This isn't a proper validation set

print(f"\nTrain set shape: {train_df.shape}")
print(f"Validation set shape: {val_df.shape}")


# --- 3. Tokenizer and PyTorch Dataset ---
print("\n--- Initializing Tokenizer & Datasets ---")
try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
except Exception as e:
    print(f"Error loading tokenizer {MODEL_NAME}: {e}")
    print("This might be due to internet restrictions in Kaggle or an incorrect model name.")
    print("Attempting fallback to 'bert-base-multilingual-cased' (results will differ).")
    try:
        MODEL_NAME_FALLBACK = 'bert-base-multilingual-cased'
        tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME_FALLBACK)
        MODEL_NAME = MODEL_NAME_FALLBACK # Update MODEL_NAME if fallback is used
    except Exception as e_fallback:
        print(f"CRITICAL ERROR: Fallback tokenizer also failed: {e_fallback}")
        exit()

class TraffyDataset(Dataset):
    def __init__(self, dataframe, tokenizer, max_len):
        self.tokenizer = tokenizer
        self.texts = dataframe['combined_text'].values
        self.targets = dataframe['duration_scaled'].values
        self.max_len = max_len

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, index):
        text = str(self.texts[index])
        target = self.targets[index]

        encoding = self.tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=self.max_len,
            return_token_type_ids=False, # Often not needed for single sentence tasks / some BERT variants
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt',
        )

        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'targets': torch.tensor(target, dtype=torch.float)
        }

# Create DataLoaders
# Ensure dataframes are not empty before creating datasets/loaders
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


# --- 4. Model Definition (WangChangBERTa for Regression) ---
class TraffyBertRegressor(nn.Module):
    def __init__(self, model_name_or_path):
        super(TraffyBertRegressor, self).__init__()
        try:
            self.bert = AutoModel.from_pretrained(model_name_or_path)
        except Exception as e:
            print(f"Error loading model {model_name_or_path} from HuggingFace: {e}")
            # Fallback already handled for tokenizer, assume MODEL_NAME is now the fallback if one was needed
            print(f"Ensure model {MODEL_NAME} is downloadable or use a different one.")
            raise e # Critical if model cannot be loaded

        self.dropout = nn.Dropout(0.1) # Add dropout for regularization
        self.regressor = nn.Linear(self.bert.config.hidden_size, 1) # Output 1 value

    def forward(self, input_ids, attention_mask):
        outputs = self.bert(
            input_ids=input_ids,
            attention_mask=attention_mask
        )
        # Use the embedding of the [CLS] token (first token)
        pooled_output = outputs.last_hidden_state[:, 0, :]
        # pooled_output = outputs.pooler_output # Alternative for some models, often works well
        
        pooled_output = self.dropout(pooled_output) # Apply dropout
        output = self.regressor(pooled_output)
        return output

print("\n--- Initializing Model ---")
model = TraffyBertRegressor(MODEL_NAME)
model.to(DEVICE)

# --- 5. Training Setup ---
optimizer = AdamW(model.parameters(), lr=LEARNING_RATE, eps=1e-8)
total_steps = len(train_loader) * EPOCHS
scheduler = get_linear_schedule_with_warmup(
    optimizer,
    num_warmup_steps=int(0.1 * total_steps), # 10% warmup
    num_training_steps=total_steps
)
criterion = nn.MSELoss() # Mean Squared Error for regression

# --- 6. Training and Evaluation Functions ---
def train_epoch_fn(model, data_loader, loss_fn, optimizer, device, scheduler):
    model.train()
    total_loss = 0
    for batch in tqdm(data_loader, desc="Training Epoch", leave=False):
        input_ids = batch["input_ids"].to(device)
        attention_mask = batch["attention_mask"].to(device)
        targets = batch["targets"].to(device).unsqueeze(1) # Ensure shape [batch_size, 1]

        optimizer.zero_grad()
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        loss = loss_fn(outputs, targets)
        total_loss += loss.item()
        loss.backward()
        nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0) # Gradient clipping
        optimizer.step()
        scheduler.step()
    return total_loss / len(data_loader)

def eval_model_fn(model, data_loader, loss_fn, device, current_scaler):
    model.eval()
    total_loss = 0
    all_targets_orig = []
    all_predictions_orig = []

    with torch.no_grad():
        for batch in tqdm(data_loader, desc="Evaluating Epoch", leave=False):
            input_ids = batch["input_ids"].to(device)
            attention_mask = batch["attention_mask"].to(device)
            targets_scaled = batch["targets"].to(device).unsqueeze(1)

            outputs_scaled = model(input_ids=input_ids, attention_mask=attention_mask)
            loss = loss_fn(outputs_scaled, targets_scaled)
            total_loss += loss.item()

            # Inverse transform for metrics if scaler is available and fitted
            targets_scaled_cpu = targets_scaled.cpu().numpy()
            outputs_scaled_cpu = outputs_scaled.cpu().numpy()

            if hasattr(current_scaler, 'inverse_transform') and hasattr(current_scaler, 'scale_'): # Check if scaler is fitted
                 try:
                    targets_orig_batch = current_scaler.inverse_transform(targets_scaled_cpu)
                    predictions_orig_batch = current_scaler.inverse_transform(outputs_scaled_cpu)
                    all_targets_orig.extend(targets_orig_batch.flatten().tolist())
                    all_predictions_orig.extend(predictions_orig_batch.flatten().tolist())
                 except Exception as e: # Catch if inverse_transform fails (e.g. dummy scaler)
                    # print(f"Warning: Could not inverse_transform during eval: {e}. Using scaled values for this batch.")
                    all_targets_orig.extend(targets_scaled_cpu.flatten().tolist())
                    all_predictions_orig.extend(outputs_scaled_cpu.flatten().tolist())
            else: # If no scaler or not fitted (e.g. dummy scaler or data issue)
                all_targets_orig.extend(targets_scaled_cpu.flatten().tolist())
                all_predictions_orig.extend(outputs_scaled_cpu.flatten().tolist())


    avg_loss = total_loss / len(data_loader)
    if not all_targets_orig or not all_predictions_orig: # Handle empty eval case
        print("Warning: Evaluation produced no targets or predictions. MAE/RMSE will be 0/NaN.")
        return avg_loss, 0, 0

    mae = mean_absolute_error(all_targets_orig, all_predictions_orig)
    rmse = np.sqrt(mean_squared_error(all_targets_orig, all_predictions_orig))
    return avg_loss, mae, rmse

# --- 7. Training Loop ---
print("\n--- Starting Training ---")
best_val_mae = float('inf')
history = {'train_loss': [], 'val_loss': [], 'val_mae': [], 'val_rmse': []}

# Check if train_loader has meaningful data
if len(train_loader.dataset) <= 1 and (train_loader.dataset.texts[0] == 'empty train' if hasattr(train_loader.dataset, 'texts') else False):
    print("CRITICAL: Training data is empty or dummy. Skipping training loop.")
    print("Model will not be trained. This usually indicates a problem with data loading or preprocessing.")
else:
    for epoch in range(EPOCHS):
        print(f'\nEpoch {epoch + 1}/{EPOCHS}')
        train_loss = train_epoch_fn(model, train_loader, criterion, optimizer, DEVICE, scheduler)
        print(f'Train Loss: {train_loss:.4f}')

        val_loss, val_mae, val_rmse = eval_model_fn(model, val_loader, criterion, DEVICE, scaler)
        print(f'Val Loss: {val_loss:.4f}, Val MAE: {val_mae:.2f} hours, Val RMSE: {val_rmse:.2f} hours')

        history['train_loss'].append(train_loss)
        history['val_loss'].append(val_loss)
        history['val_mae'].append(val_mae)
        history['val_rmse'].append(val_rmse)

        if val_mae < best_val_mae:
            print(f"Validation MAE improved ({best_val_mae:.2f} ---> {val_mae:.2f}). Saving model...")
            try:
                torch.save(model.state_dict(), 'best_model_state.bin')
                best_val_mae = val_mae
            except Exception as e:
                print(f"Error saving model: {e}")

print("\n--- Training Finished ---")
if best_val_mae != float('inf'):
    print(f"Best Validation MAE: {best_val_mae:.2f} hours")
else:
    print("Model did not improve or training was skipped.")

# --- 8. (Optional) Example Prediction on a Sample Text ---
# Load the best model if training occurred and was successful
if best_val_mae != float('inf') and ('best_model_state.bin'): # Check if file exists too (os.path.exists)
    try:
        model.load_state_dict(torch.load('best_model_state.bin', map_location=DEVICE))
        model.eval()
        print("\nLoaded best model for sample prediction.")

        sample_text = "ประเภท: ถนน | หน่วยงาน: เขตจตุจักร | ปัญหา: ถนนเป็นหลุมบ่อ เดินทางลำบากมากครับ | ที่อยู่: ซอยวิภาวดีรังสิต 20 แขวงจอมพล เขตจตุจักร"
        
        encoded_sample = tokenizer.encode_plus(
            sample_text,
            add_special_tokens=True,
            max_length=MAX_LEN,
            return_token_type_ids=False,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt',
        )
        input_ids = encoded_sample['input_ids'].to(DEVICE)
        attention_mask = encoded_sample['attention_mask'].to(DEVICE)

        with torch.no_grad():
            prediction_scaled = model(input_ids, attention_mask)
            prediction_scaled_cpu = prediction_scaled.cpu().numpy()

        if hasattr(scaler, 'inverse_transform') and hasattr(scaler, 'scale_'):
            try:
                prediction_hours = scaler.inverse_transform(prediction_scaled_cpu).flatten()[0]
                print(f"\nSample Prediction for text: '{sample_text}'")
                print(f"Predicted duration (scaled): {prediction_scaled_cpu.flatten()[0]:.4f}")
                print(f"Predicted duration (hours): {prediction_hours:.2f} hours")
            except Exception as e:
                print(f"Warning: Could not inverse_transform sample prediction: {e}")
                print(f"Predicted duration (scaled only): {prediction_scaled_cpu.flatten()[0]:.4f}")
        else:
             print(f"\nSample Prediction for text: '{sample_text}'")
             print(f"Predicted duration (scaled, no inverse scaler available): {prediction_scaled_cpu.flatten()[0]:.4f}")

    except FileNotFoundError:
        print("\nBest model file not found. Skipping sample prediction.")
    except Exception as e:
        print(f"\nError during sample prediction: {e}")
else:
    print("\nSkipping sample prediction as model was not meaningfully trained or saved.")

print("\n--- Script Finished ---")