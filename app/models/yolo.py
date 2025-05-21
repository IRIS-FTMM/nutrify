from ultralytics import YOLO
from typing import List, Dict

model_path = r"app\models\yolov8s.pt"  # path ke model pretrained
model = YOLO(model_path)

def detect_food_labels(image_path: str) -> List[Dict]:
    results = model(image_path)
    detections = []
    for result in results:
        for box in result.boxes:
            cls_id = int(box.cls[0].item())
            label = model.names[cls_id]
            confidence = float(box.conf[0].item())
            detections.append({"label": label, "confidence": confidence})
    return detections

if __name__ == "__main__":
    test_img = "data/test/images/example.jpg"
    print("Detected labels:", detect_food_labels(test_img))