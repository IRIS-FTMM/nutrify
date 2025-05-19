from ultralytics import YOLO

# Load model
model = YOLO('app/models/yolov8s.pt')

# Evaluasi model pada dataset validasi
metrics = model.val(data='food_dataset.yaml', imgsz=640, batch=16)

# metrics berisi dictionary dengan hasil metrik, misal mAP, precision, recall
print(metrics)
