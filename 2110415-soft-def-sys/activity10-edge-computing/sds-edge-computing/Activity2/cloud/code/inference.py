import logging
import random, io
import numpy as np
from ultralytics import YOLO
import torch, os, json, base64, cv2, time
import json
from PIL import Image
import torchvision.transforms as transforms

logger = logging.getLogger(__name__)
nms_conf = 0.25  # Confidence threshold for NMS
nms_iou = 0.45   # IoU threshold for NMS

def model_fn(model_dir):
    print("Executing model_fn from inference.py ...")
    env = os.environ
    model = YOLO(os.path.join(model_dir, env['YOLOV8_MODEL']), task="detect")
    return model

def input_fn(request_body, request_content_type):
    print("Executing input_fn from inference.py ...")
    start_time = time.time()
    
    if request_content_type:
        jpg_original = base64.b64decode(request_body)
        jpg_as_np = np.frombuffer(jpg_original, dtype=np.uint8)
        img = cv2.imdecode(jpg_as_np, cv2.IMREAD_COLOR)
    else:
        raise Exception("Unsupported content type: " + request_content_type)
    
    result = {
        "start_time": start_time,
        "img": img
    }
    return result
    
def predict_fn(input_data, model):
    print("Executing predict_fn from inference.py ...")
    # Measure the inference time
    start_time = input_data['start_time']
    image = input_data['img']
    
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    
    with torch.no_grad():
        results = model.predict(image, conf=nms_conf, iou=nms_iou, classes=[0])
        
    # Process results and draw bounding boxes on the image
    for result in results:
        image = result.plot()  # This will draw bounding boxes on the image
        
    result = results[0]  # Get the first (and in this case, only) result
        
    # Retrieve inference times
    inference_time = result.speed   # Inference time
  
    # Retrieve detected classes and format them
    detected_boxes = result.boxes  # Extract boxes
    detections = []
    class_count = {}
        
    for box in detected_boxes:
        class_id = int(box.cls)  # Class ID of the detected object
        confidence = box.conf  # Confidence score
        class_name = result.names[class_id]  # Get class name from ID

        # Append detection information
        detections.append({
            'class_id': class_id,
            'class_name': class_name,
            'confidence': confidence
        })

        # Count occurrences of each class
        class_count[class_name] = class_count.get(class_name, 0) + 1

    # Prepare a formatted string of detected classes
    detected_classes = ', '.join(f"{count} {name}" for name, count in class_count.items())
    
    results = {
        'start_time': start_time,
        'predicted_image': image,
        'detections': detected_classes,
        'inference_time': inference_time,
    }
    
    return results
        
def output_fn(prediction_output, content_type):
    print("Executing output_fn from inference.py ...")
    
    bgr_img = prediction_output["predicted_image"]
    rgb_image = bgr_img[..., ::-1] 
        
    image = Image.fromarray(rgb_image)
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")  # Save as JPEG
    processed_image_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
    
    processing_time = time.time() - prediction_output['start_time']
    
    result = {
        'processing_time': processing_time,
        'predicted_image': processed_image_base64,
        'detections': prediction_output['detections'],
        'inference_time': prediction_output['inference_time'],
    }
    return json.dumps({'data': result})