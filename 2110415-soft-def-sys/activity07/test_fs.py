import sys
import time
import os

def write_files(source_file, n, target_dir="."):
    # Read random bytes into memory once
    with open(source_file, "rb") as f:
        data = f.read()

    start_time = time.time()
    for i in range(int(n)):
        filename = os.path.join(target_dir, f"testfile_{i}.dat")
        with open(filename, "wb") as wf:
            wf.write(data)
    end_time = time.time()

    elapsed = end_time - start_time
    size_kb = len(data) * int(n) / 1024
    throughput = size_kb / elapsed
    print(f"Time taken: {elapsed:.2f} s")
    print(f"Write throughput: {throughput:.2f} KB/s")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 test_fs.py <source_data> <n> [target_dir]")
        sys.exit(1)

    source_data = sys.argv[1]
    n = sys.argv[2]
    target_dir = sys.argv[3] if len(sys.argv) > 3 else "."
    write_files(source_data, n, target_dir)