from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import base64
from ultralytics import YOLO
import time
import boto3
import json
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

# Config
nms_conf = 0.25
nms_iou = 0.45
low_conf_threshold = 0.5  # If no box exceeds this, switch to "cloud"

# Model names and paths
edge_model_name = "yolov8n"
cloud_model_name = "yolov8l"
edge_model_path = f"{edge_model_name}.pt"
cloud_model_path = f"{cloud_model_name}.pt"

# Load local edge model
if os.path.exists(edge_model_path):
    print(f"Loading edge model locally: {edge_model_path}")
    model_edge = YOLO(edge_model_path)
else:
    print(
        f"Edge model not found at {edge_model_path}, downloading '{edge_model_name}'")
    model_edge = YOLO(edge_model_name)

# Load cloud model (mock)
if os.path.exists(cloud_model_path):
    print(f"Loading cloud model locally: {cloud_model_path}")
    model_cloud = YOLO(cloud_model_path)
else:
    print(
        f"Cloud model not found at {cloud_model_path}, downloading '{cloud_model_name}'")
    model_cloud = YOLO(cloud_model_name)

# Setup SageMaker runtime client
sagemaker_runtime = boto3.client('sagemaker-runtime', region_name=os.getenv("AWS_REGION"),
                                 aws_access_key_id=os.getenv(
                                     "AWS_ACCESS_KEY_ID"),
                                 aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"))
sagemaker_endpoint_name = "YOLOv8"  # Change to your endpoint


def call_sagemaker_cloud(base64_image):
    """Call SageMaker endpoint and return JSON response."""
    response = sagemaker_runtime.invoke_endpoint(
        EndpointName=sagemaker_endpoint_name,
        ContentType='application/json',
        Body=json.dumps(base64_image)
    )
    result = response['Body'].read().decode('utf-8')
    return json.loads(result)


@app.route('/predict', methods=['POST'])
def predict():
    start_time = time.time()
    data = request.json
    base64_image = data.get('image')
    if not base64_image:
        return jsonify({'error': 'No image provided'}), 400

    image_data = base64.b64decode(base64_image)
    image = Image.open(io.BytesIO(image_data))

    # Run initial inference using the small (edge) model
    results = model_edge.predict(
        image, conf=nms_conf, iou=nms_iou, classes=[0])
    result = results[0]
    boxes = result.boxes

    # Determine confidence filtering condition
    confidence_threshold = 0.4
    total_boxes = len(boxes)
    high_conf_boxes = sum(
        [(box.conf > confidence_threshold).item() for box in boxes])

    # If fewer than half of the boxes exceed the threshold, use the cloud (YOLOv8l)
    if total_boxes > 0 and high_conf_boxes < total_boxes * 0.7:
        cloud_result = call_sagemaker_cloud(base64_image)
        processing_time = time.time() - start_time
        output_result = cloud_result["data"]
        output_result.update(
            {
                'high_conf_boxes': high_conf_boxes,
                'total_boxes': total_boxes,
                'used_model': "yolov8l",
                'processing_time': processing_time,
            }
        )
        return jsonify(output_result)

    used_model = "yolov8n"

    # Draw the bounding boxes
    image = result.plot()
    image_rgb = image[..., ::-1]
    image = Image.fromarray(image_rgb)
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    processed_image_base64 = base64.b64encode(
        buffered.getvalue()).decode('utf-8')

    # Format detection results
    detections = []
    class_count = {}
    for box in boxes:
        class_id = int(box.cls)
        confidence = float(box.conf)
        class_name = result.names[class_id]
        detections.append({
            'class_id': class_id,
            'class_name': class_name,
            'confidence': confidence
        })
        class_count[class_name] = class_count.get(class_name, 0) + 1

    detected_classes = ', '.join(
        f"{count} {name}" for name, count in class_count.items())
    processing_time = time.time() - start_time

    return jsonify({
        'used_model': used_model,
        'processing_time': processing_time,
        'predicted_image': processed_image_base64,
        'detections': detected_classes,
        'inference_time': result.speed,
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
