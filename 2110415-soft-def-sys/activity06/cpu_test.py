import time

def main():
    # Number of iterations
    iterations = 50000
    
    # List to store timestamps
    timestamps = []
    
    # Record the start time for reference
    start_time = time.perf_counter_ns()
    
    # Loop 50,000 times, collecting timestamps
    for i in range(iterations):
        current_time = time.perf_counter_ns()
        timestamps.append(current_time)
    
    # After all loops complete, write to file
    # Calculate time in seconds relative to start
    with open('cpu_results.txt', 'w') as f:
        for i, timestamp in enumerate(timestamps):
            # Convert nanoseconds to seconds relative to start
            time_seconds = (timestamp - start_time) / 1e9
            f.write(f"{i}, {time_seconds:.8f}\n")
    
    print(f"Completed {iterations} iterations")
    print(f"Results written to cpu_results.txt")

if __name__ == "__main__":
    main()