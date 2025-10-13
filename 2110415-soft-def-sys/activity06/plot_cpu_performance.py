import matplotlib.pyplot as plt
import pandas as pd

# Define scenarios
scenarios = {
    # 'Cloud t2.micro No Credits': {
    #     'file': 'cpu_results_no_credit.txt',
    #     'color': 'gold',
    #     'linestyle': '-'
    # },
    'Cloud t2.micro with Credits': {
        'file': 'cpu_results_credit.txt',
        'color': 'purple',
        'linestyle': '-'
    },
    'Virtual Machine': {
        'file': 'cpu_results_VM.txt',
        'color': 'blue',
        'linestyle': '-'
    },
    'Physical Machine': {
        'file': 'cpu_results.txt',
        'color': 'red',
        'linestyle': '-'
    }
}

plt.figure(figsize=(10, 6))

# Plot each scenario
for name, info in scenarios.items():
    try:
        data = pd.read_csv(info['file'], header=None, names=['Step', 'Time'])
        plt.plot(
            data['Step'], data['Time'],
            label=name,
            color=info['color'],
            linestyle=info['linestyle'],
            linewidth=2
        )
    except FileNotFoundError:
        print(f"Warning: File not found - {info['file']}")

# Configure plot
plt.title("CPU Performance Comparison", fontsize=16)
plt.xlabel("Computation Step", fontsize=12)
plt.ylabel("Execution Time (seconds)", fontsize=12)
plt.legend()
plt.grid(True, linestyle='--', alpha=0.6)
plt.tight_layout()

# Save and show
plt.savefig("cpu_performance_plot_no_no_credit.png", dpi=300)
plt.show()
