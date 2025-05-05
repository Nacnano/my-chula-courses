# Install necessary libraries
!pip install transformers torch datasets

# Import libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from transformers import AutoTokenizer, AutoModelForSequenceClassification, Trainer, TrainingArguments
from datasets import Dataset
import torch

# Load data
DATA_PATH = '/kaggle/input/traffy-fondue-dsde-chula-dataset/bangkok_traffy.csv'
df = pd.read_csv(DATA_PATH)

# Filter closed tickets (assuming 'state' == 'closed' indicates resolved tickets)
# Note: Adjust 'closed' based on actual 'state' values, e.g., 'เสร็จสิ้น' if in Thai
df = df[df['state'] == 'closed']

# Convert timestamps to datetime
df['timestamp'] = pd.to_datetime(df['timestamp'])
df['last_activity'] = pd.to_datetime(df['last_activity'])

# Calculate duration in days
df['duration'] = (df['last_activity'] - df['timestamp']).dt.total_seconds() / 86400

# Handle missing values for text fields
text_fields = ['type', 'organization', 'comment', 'address', 'subdistrict', 'district', 'province', 'coords']
for field in text_fields:
    df[field] = df[field].fillna('')

# Extract day of week and month from timestamp for additional context
df['day_of_week'] = df['timestamp'].dt.day_name()
df['month'] = df['timestamp'].dt.month_name()

# Create input text by concatenating relevant fields available at ticket creation
df['input_text'] = (
    "Type: " + df['type'] + " " +
    "Organization: " + df['organization'] + " " +
    "Comment: " + df['comment'] + " " +
    "Address: " + df['address'] + " " +
    "Subdistrict: " + df['subdistrict'] + " " +
    "District: " + df['district'] + " " +
    "Province: " + df['province'] + " " +
    "Coordinates: " + df['coords'] + " " +
    "Day of week: " + df['day_of_week'] + " " +
    "Month: " + df['month']
)

# Split data into training and validation sets
X = df['input_text']
y = df['duration']
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Create DataFrames for training and validation
train_df = pd.DataFrame({'text': X_train, 'label': y_train})
val_df = pd.DataFrame({'text': X_val, 'label': y_val})

# Convert to Dataset
train_dataset = Dataset.from_pandas(train_df)
val_dataset = Dataset.from_pandas(val_df)

# Load tokenizer for WangChanBERTa
tokenizer = AutoTokenizer.from_pretrained('airesearch/wangchanberta-base-att-spm-uncased')

# Define tokenization function
def tokenize_function(examples):
    return tokenizer(examples['text'], padding='max_length', truncation=True, max_length=512)

# Tokenize datasets
train_dataset = train_dataset.map(tokenize_function, batched=True)
val_dataset = val_dataset.map(tokenize_function, batched=True)

# Set format for PyTorch
train_dataset.set_format('torch', columns=['input_ids', 'attention_mask', 'label'])
val_dataset.set_format('torch', columns=['input_ids', 'attention_mask', 'label'])

# Load model for regression (num_labels=1 for regression)
model = AutoModelForSequenceClassification.from_pretrained('airesearch/wangchanberta-base-att-spm-uncased', num_labels=1)

# Define training arguments
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10,
    evaluation_strategy='epoch',  # Evaluate at the end of each epoch
    save_strategy='epoch',        # Save at the end of each epoch
    load_best_model_at_end=True,  # Load the best model based on evaluation
)

# Create Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
)

# Train the model
trainer.train()

# Optional: Save the model
trainer.save_model('/kaggle/working/model_output')
tokenizer.save_pretrained('/kaggle/working/model_output')