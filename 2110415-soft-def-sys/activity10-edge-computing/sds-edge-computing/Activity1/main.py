import cv2
import socket
import json
import threading
import argparse

class Camera:
    def __init__(self, rtsp_link):
        self.capture = cv2.VideoCapture(rtsp_link)

    def get_frame(self):
        ret, frame = self.capture.read()
        return frame if ret else None

    def stop(self):
        self.capture.release()

class BoundingBoxReceiver:
    def __init__(self, host='0.0.0.0', port=12345):
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.server_socket.bind((host, port))
        self.bounding_boxes = []

    def start_receiving(self):
        while True:
            data, _ = self.server_socket.recvfrom(4096)
            bbox = json.loads(data.decode('utf-8'))
            print(bbox)
            self.bounding_boxes = bbox.get('detections', [])

    def get_bounding_boxes(self):
        return self.bounding_boxes

# Argument parser
parser = argparse.ArgumentParser(description="RTSP Object Detection with YOLOv8")
parser.add_argument('rtsp_url', type=str, help="RTSP URL of the camera stream")
args = parser.parse_args()

# Configuration
rtsp_url = args.rtsp_url
camera = Camera(rtsp_url)
bbox_receiver = BoundingBoxReceiver()

# Start the bounding box receiver in a separate thread
threading.Thread(target=bbox_receiver.start_receiving, daemon=True).start()

while True:
    frame = camera.get_frame()
    if frame is not None:
        boxes = bbox_receiver.get_bounding_boxes()
        for detection in boxes:
            x1, y1 = int(detection['box']['x1']), int(detection['box']['y1'])
            x2, y2 = int(detection['box']['x2']), int(detection['box']['y2'])
            conf = detection['confidence']
            cls = detection['class']

            # Draw the bounding box and label
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(frame, f"{cls} {conf:.2f}", (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Display the frame
        cv2.imshow("RTSP Stream", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

camera.stop()
cv2.destroyAllWindows()
