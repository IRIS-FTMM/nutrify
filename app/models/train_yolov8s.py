from ultralytics import YOLO

model = YOLO('yolov8s.pt')

model.train(
    data='food_dataset.yaml',
    epochs=100,
    imgsz=640,
    batch=16,
    project='runs/train',
    name='exp',
    device='cpu'
)