import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# For demonstration, we'll assume the dataset has columns like 'text', 'duration_hours', and other relevant features
try:
    DATA_PATH = '/kaggle/input/traffy-fondue-dsde-chula-dataset/bangkok_traffy.csv'
    df = pd.read_csv(DATA_PATH)  # Update with actual file path or data loading method
except FileNotFoundError:
    print("Dataset file not found. Please provide the correct path to the dataset.")
    # Creating a dummy dataset for demonstration if actual data isn't provided
    np.random.seed(42)
    df = pd.DataFrame({
        'text': [f'sample_text_{i}' for i in range(1000)],
        'duration_hours': np.random.lognormal(mean=2, sigma=0.5, size=1000),
        'feature1': np.random.normal(10, 2, 1000),
        'feature2': np.random.choice(['A', 'B', 'C'], 1000)
    })

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

df = df[df['last_activity'].notna() & (df['last_activity'] > df['timestamp'])].copy()
print(f"Shape after filtering for valid 'last_activity': {df.shape}")

if not df.empty:
    df['duration'] = (df['last_activity'] - df['timestamp'])
    df['duration_hours'] = df['duration'].dt.total_seconds() / 3600.0
    df = df[df['duration_hours'] > 0]
    print(f"Shape after calculating positive 'duration_hours': {df.shape}")

# --- Exploratory Data Analysis ---
print("\n--- Basic Dataset Information ---")
print(df.info())
print("\n--- First 5 Rows of Dataset ---")
print(df.head())
print("\n--- Summary Statistics ---")
print(df.describe())

# --- Missing Values Analysis ---
print("\n--- Missing Values ---")
missing_values = df.isnull().sum()
print(missing_values[missing_values > 0] if missing_values.sum() > 0 else "No missing values.")