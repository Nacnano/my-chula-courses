# Part B (20%)

## Problem statement

You are asked to use gnuPG to encrypt a file using my public key use the following template.

----------------------------------------------------- (DO NOT INCLUDE THIS LINE)
COMPUTER SECURITY
ID: 4123456789
NAME: GOOD STUDENT
----------------------------------------------------- (DO NOT INCLUDE THIS LINE)

ENCRYPT only. Please DO NOT sign (I do not have your public key).
Use the ascii armored output format only.

Upload the encrypted file classDeeDee System.

Make sure that your file can be parsed by GPG software and simple \*NIX grep command. (i.e. DO NOT create a PDF or embed the output in a word document.

This is my public key.

-----BEGIN PGP PUBLIC KEY BLOCK-----
mDMEaRLM7BYJKwYBBAHaRw8BAQdA2LoNsBzMecVOmu7tXed+TM3qzmlFrxzh+s1a
K8UhdtG0NktyZXJrIFBpcm9tc29wYSAoU2VjdXJpdHkgY2xhc3MpIDxrcmVyay5w
QGNodWxhLmFjLnRoPoiWBBMWCgA+FiEELtz9jMq0yAx6askzXXmfc078BIgFAmkS
zOwCGwMFCQHhM4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQXXmfc078BIg4
fQEA9lbj4iVvZnz2Q3U7s/tYD+dA3GBJRaCYG8eC3hx+iE8A/35e7yVZHYUnzLOQ
fqU7Pb0gZ7r3U1PN+U3fJzQ5/lEDuDgEaRLM7BIKKwYBBAGXVQEFAQEHQI8gmkQi
/stJ7VvSkQk/acMaQolkkanLkrQxHkWhui9CAwEIB4h+BBgWCgAmFiEELtz9jMq0
yAx6askzXXmfc078BIgFAmkSzOwCGwwFCQHhM4AACgkQXXmfc078BIjObgEA9Zyj
j5UUTk+GNrZSRC6hh5fmo4f1VNU8TFTFs96y8UIBAI4AuNqUOhQRFo/yWAZyE1+j
lrFQt0/krmWlgfCf9nsJ
=FQ3j
-----END PGP PUBLIC KEY BLOCK-----

## Solution

### 1. Save Public Key
Save the provided public key block to a file named `public_key.asc`.

### 2. Import Public Key
Import the professor's public key into your GPG keyring:
```bash
gpg --import public_key.asc
```

### 3. Create Student Info File
Create a file named `student_info.txt` with the following content:
```text
COMPUTER SECURITY
ID: 6531313221
NAME: Chotpisit Adunsehawat
```

### 4. Encrypt the File
Encrypt the file using the recipient's email specified in the public key (`krerk.p@chula.ac.th`). Use the `--armor` flag for ASCII output and `--encrypt` to encrypt without signing.

```bash
gpg --encrypt --armor --recipient krerk.p@chula.ac.th --output student_info.txt.asc student_info.txt
```

### 5. Verify Output
The resulting file `student_info.txt.asc` is the encrypted file to be uploaded. It starts with `-----BEGIN PGP MESSAGE-----`.
