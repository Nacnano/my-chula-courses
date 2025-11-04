import socket
import json
from ultralytics import YOLO
import argparse

# Set up argument parser for the RTSP URL and server address
parser = argparse.ArgumentParser(description="RTSP Object Detection with YOLOv8")
parser.add_argument('--rtsp_url', type=str, required=True, help="RTSP URL of the camera stream")
parser.add_argument('--server_ip', type=str, help="IP address of the server")
parser.add_argument('--server_port', type=int, default=12345, help="Port number of the server")
args = parser.parse_args()

# Initialize socket connection
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_address = (args.server_ip, args.server_port)

# Load the YOLOv8 model
model = YOLO('../model/yolov8n_ncnn_model', task='detect') 

# You can customize NMS parameters here
nms_conf = 0.25  # Confidence threshold for NMS
nms_iou = 0.45   # IoU threshold for NMS

# Perform inference on the RTSP stream
rtsp_url = args.rtsp_url
results = model(source=rtsp_url, stream=True, conf=nms_conf, iou=nms_iou)  # Generator of Results objects

try:
    for r in results:
        boxes = r.boxes  # Boxes object for bbox outputs
        output_data = []

        # Iterate over the detected boxes
        for box in boxes:
            # Extract coordinates, confidence score, and class ID
            x1, y1, x2, y2 = box.xyxy[0].tolist()  # Bounding box coordinates
            conf = box.conf[0].item()  # Confidence score
            class_id = int(box.cls[0].item())  # Class ID
            class_name = model.names[class_id]  # Get class name

            # Create a dictionary for this detection
            detection = {
                "box": {
                    "x1": x1,
                    "y1": y1,
                    "x2": x2,
                    "y2": y2
                },
                "confidence": conf,
                "class": class_name
            }

            # Add the detection result to the output data list
            output_data.append(detection)

        if output_data:  # Only send data if there are detections
            # Convert to JSON
            json_data = json.dumps({"detections": output_data})

            # Send the JSON data via the socket
            sock.sendto(json_data.encode('utf-8'), server_address)

finally:
    # Close the socket connection
    sock.close()
