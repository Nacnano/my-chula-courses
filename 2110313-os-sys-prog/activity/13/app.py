import os

secret_user = os.environ.get("secret_user")

if secret_user:
    print(f"Hello, {secret_user}")
else:
    print("Error: The 'secret_user' environment variable is not set.")