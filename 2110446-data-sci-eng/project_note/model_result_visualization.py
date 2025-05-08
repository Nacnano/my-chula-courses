import matplotlib.pyplot as plt
import numpy as np

# Parse the training data
epochs = np.arange(1, 6)
train_loss = [0.0871, 0.0694, 0.0645, 0.0634, 0.0610]
val_loss = [0.0693, 0.0671, 0.0667, 0.0664, 0.0664]
val_mae = [1.19, 1.19, 1.18, 1.21, 1.18]
val_rmse = [1.50, 1.47, 1.46, 1.46, 1.46]

# Final test metrics
test_loss = 0.0700
test_mae = 1.26
test_rmse = 1.54

# Set up the figure with subplots
plt.figure(figsize=(15, 12))
plt.style.use('ggplot')

# 1. Loss plot (Training vs Validation)
plt.subplot(2, 2, 1)
plt.plot(epochs, train_loss, 'o-', color='blue', label='Training Loss', linewidth=2)
plt.plot(epochs, val_loss, 'o-', color='green', label='Validation Loss', linewidth=2)
plt.grid(True, linestyle='--', alpha=0.7)
plt.xlabel('Epoch', fontsize=12)
plt.ylabel('Loss', fontsize=12)
plt.title('Training and Validation Loss by Epoch', fontsize=14, fontweight='bold')
plt.legend()
plt.xticks(epochs)

# 2. Validation metrics (MAE & RMSE)
plt.subplot(2, 2, 2)
plt.plot(epochs, val_mae, 'o-', color='orange', label='Validation MAE (days)', linewidth=2)
plt.plot(epochs, val_rmse, 'o-', color='purple', label='Validation RMSE (days)', linewidth=2)
plt.grid(True, linestyle='--', alpha=0.7)
plt.xlabel('Epoch', fontsize=12)
plt.ylabel('Days', fontsize=12)
plt.title('Validation Metrics by Epoch', fontsize=14, fontweight='bold')
plt.legend()
plt.xticks(epochs)

# 3. Final test metrics visualization as horizontal bars
plt.subplot(2, 2, 3)
metrics = ['Loss', 'MAE (days)', 'RMSE (days)']
values = [test_loss, test_mae, test_rmse]
colors = ['#1f77b4', '#ff7f0e', '#9467bd']

bars = plt.barh(metrics, values, color=colors, alpha=0.7)
plt.grid(True, linestyle='--', alpha=0.7, axis='x')
plt.xlabel('Value', fontsize=12)
plt.title('Final Test Metrics', fontsize=14, fontweight='bold')

# Add value labels on the bars
for bar, value in zip(bars, values):
    plt.text(bar.get_width() + 0.01, bar.get_y() + bar.get_height()/2, 
             f'{value:.4f}', va='center', fontsize=10)

# 4. Combined metrics comparison across epochs
plt.subplot(2, 2, 4)
width = 0.2
x = np.arange(len(epochs))

plt.bar(x - width, train_loss, width, label='Train Loss', color='blue', alpha=0.7)
plt.bar(x, val_loss, width, label='Val Loss', color='green', alpha=0.7)
plt.bar(x + width, val_mae, width, label='Val MAE', color='orange', alpha=0.7)
plt.bar(x + width*2, val_rmse, width, label='Val RMSE', color='purple', alpha=0.7)

plt.xlabel('Epoch', fontsize=12)
plt.ylabel('Value', fontsize=12)
plt.title('All Metrics Comparison by Epoch', fontsize=14, fontweight='bold')
plt.xticks(x + width/2, epochs)
plt.legend(loc='upper right')
plt.grid(True, linestyle='--', alpha=0.5)

plt.tight_layout()
plt.suptitle('Model Training Performance Analysis', fontsize=16, fontweight='bold', y=1.02)
plt.subplots_adjust(top=0.9)

# Show the plot
plt.show()

# Additional analysis plot - convergence trends
plt.figure(figsize=(10, 6))

# Normalized metrics to show convergence on same scale
metrics = {
    'Train Loss': np.array(train_loss) / max(train_loss),
    'Val Loss': np.array(val_loss) / max(val_loss),
    'Val MAE': np.array(val_mae) / max(val_mae),
    'Val RMSE': np.array(val_rmse) / max(val_rmse)
}

for name, values in metrics.items():
    plt.plot(epochs, values, 'o-', label=name, linewidth=2)

plt.grid(True, linestyle='--', alpha=0.7)
plt.xlabel('Epoch', fontsize=12)
plt.ylabel('Normalized Value (relative to max)', fontsize=12)
plt.title('Convergence Analysis - All Metrics', fontsize=14, fontweight='bold')
plt.legend()
plt.xticks(epochs)

plt.tight_layout()
plt.show()

# Print training summary table
print("\nTraining Summary Table:")
print("-" * 80)
print(f"{'Epoch':<10}{'Train Loss':<15}{'Val Loss':<15}{'Val MAE':<15}{'Val RMSE':<15}")
print("-" * 80)
for i, (tl, vl, vm, vr) in enumerate(zip(train_loss, val_loss, val_mae, val_rmse), 1):
    print(f"{i:<10}{tl:<15.4f}{vl:<15.4f}{vm:<15.2f}{vr:<15.2f}")
print("-" * 80)
print(f"{'Test':<10}{test_loss:<15.4f}{'':<15}{test_mae:<15.2f}{test_rmse:<15.2f}")
print("-" * 80)

# Calculate improvements
train_loss_improvement = (train_loss[0] - train_loss[-1]) / train_loss[0] * 100
val_loss_improvement = (val_loss[0] - val_loss[-1]) / val_loss[0] * 100

print(f"\nKey Observations:")
print(f"- Training loss improved by {train_loss_improvement:.2f}% from epoch 1 to 5")
print(f"- Validation loss improved by {val_loss_improvement:.2f}% from epoch 1 to 5")
print(f"- Validation MAE stabilized around {np.mean(val_mae):.2f} days")
print(f"- Validation RMSE stabilized around {np.mean(val_rmse):.2f} days")
print(f"- Test metrics suggest good generalization with slightly higher error")
print(f"- The model appears to have reached near-optimal performance by epoch 3")