from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import base64
from ultralytics import YOLO
import time
import os

app = Flask(__name__)
CORS(app)

model_name = "yolov8n"
model_path = f"model/{model_name}.pt"

nms_conf = 0.25
nms_iou = 0.45

# Load the model only if it exists; otherwise, fallback to auto-download
if os.path.exists(model_path):
    print(f"Loading local model: {model_path}")
    model = YOLO(model_path)
else:
    print(
        f"Model not found at {model_path}, downloading '{model_name}' from ultralytics repo...")
    model = YOLO(model_name)  # This will download from the internet


@app.route('/predict', methods=['POST'])
def predict():
    start_time = time.time()

    data = request.json
    base64_image = data.get('image')
    if not base64_image:
        return jsonify({'error': 'No image provided'}), 400

    image_data = base64.b64decode(base64_image)
    image = Image.open(io.BytesIO(image_data))

    results = model.predict(image, conf=nms_conf, iou=nms_iou, classes=[0])

    # Process results and draw bounding boxes on the image
    for result in results:
        image = result.plot()  # Draw boxes

    # Convert image to base64
    image_rgb = image[..., ::-1]
    image = Image.fromarray(image_rgb)
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    processed_image_base64 = base64.b64encode(
        buffered.getvalue()).decode('utf-8')

    result = results[0]
    inference_time = result.speed
    detected_boxes = result.boxes
    detections = []
    class_count = {}

    for box in detected_boxes:
        class_id = int(box.cls)
        confidence = box.conf
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
        'processing_time': processing_time,
        'predicted_image': processed_image_base64,
        'detections': detected_classes,
        'inference_time': inference_time,
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
