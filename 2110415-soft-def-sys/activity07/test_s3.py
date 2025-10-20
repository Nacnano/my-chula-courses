
import sys
import time
import boto3
import os

def upload_files(source_file, n, bucket_name, prefix="experiment/"):
    s3 = boto3.client("s3")
    with open(source_file, "rb") as f:
        data = f.read()

    start_time = time.time()
    for i in range(int(n)):
        key_name = f"{prefix}testobj_{i}.dat"
        s3.put_object(Bucket=bucket_name, Key=key_name, Body=data)
    end_time = time.time()

    elapsed = end_time - start_time
    size_kb = len(data) * int(n) / 1024
    throughput = size_kb / elapsed
    print(f"Uploaded {n} files to S3 bucket: {bucket_name}")
    print(f"Time taken: {elapsed:.2f} s")
    print(f"Write throughput: {throughput:.2f} KB/s")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python3 test_s3.py <source_data> <n> <bucket_name>")
        sys.exit(1)

    source_data = sys.argv[1]
    n = sys.argv[2]
    bucket_name = sys.argv[3]
    upload_files(source_data, n, bucket_name)