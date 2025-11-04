FROM python:3.11-slim

WORKDIR /app

# Install system dependencies required by OpenCV / Ultralytics
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Default command (can be overridden in docker-compose)
CMD ["python", "edge-server.py"]
