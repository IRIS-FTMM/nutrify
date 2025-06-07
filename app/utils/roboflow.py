from inference_sdk import InferenceHTTPClient
from ultralytics import YOLO
from typing import List, Dict
import os

# Initialize Roboflow client
roboflow_client = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key=os.getenv("ROBOFLOW_MODEL_API_KEY")  # Ensure this is set correctly
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load YOLOv8 model once at startup (correcting the path)
yolo_model = YOLO(os.path.join(BASE_DIR, "models", "yolov8s.pt"))  # Ensure the path to best.pt is correct

def detect_food_labels(image_path: str) -> List[Dict]:
    # Step 1: First try to detect food using Roboflow
    roboflow_result = roboflow_client.run_workflow(
        workspace_name="machinelearning-4tyun",
        workflow_id="detect-and-classify",
        images={"image": image_path},
        use_cache=True  # Cache the workflow for 15 minutes
    )
    
    detections = []

    # Step 2: Check if Roboflow detected objects with confidence >= 50%
    for item in roboflow_result:
        predictions = item.get('detection_predictions', {}).get('predictions', [])
        
        for prediction in predictions:
            label = prediction['class']
            confidence = prediction['confidence']
            
            if confidence >= 0.50:  # Only consider detections with confidence >= 50%
                x, y, width, height = prediction['x'], prediction['y'], prediction['width'], prediction['height']
                bbox = [x, y, x + width, y + height]  # Calculate bounding box (left, top, right, bottom)
                detections.append({
                    "label": label,
                    "confidence": confidence,
                    "bbox": bbox  # Adding the bounding box information
                })

    # If Roboflow doesn't detect any object with confidence >= 50%, fallback to YOLOv8
    if not detections:
        print("Roboflow did not detect any objects with sufficient confidence. Using YOLOv8 as fallback.")
        
        # Run detection using YOLOv8
        yolo_results = yolo_model(image_path)
        
        for result in yolo_results:
            for box in result.boxes:
                cls_id = int(box.cls[0].item())
                label = yolo_model.names[cls_id]
                confidence = float(box.conf[0].item())
                bbox = box.xyxy[0].tolist()

                detections.append({
                    "label": label,
                    "confidence": confidence,
                    "bbox": bbox  # Adding the bounding box information
                })

    return detections
