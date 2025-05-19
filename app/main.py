from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from ultralytics import YOLO
import shutil
import os

app = FastAPI()

# Setup CORS (ubah allow_origins sesuai domain frontend kamu)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Setup folder templates
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "..", "templates"))

# Mount static folder pointing ke templates/assets agar css bisa diakses
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "..", "templates", "assets")), name="static")

# Load YOLOv8 model sekali saat startup
model = YOLO(os.path.join(BASE_DIR, "models", "yolov8s.pt"))

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})

@app.get("/about", response_class=HTMLResponse)
async def about(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})

@app.get("/information", response_class=HTMLResponse)
async def information(request: Request):
    return templates.TemplateResponse("information.html", {"request": request})

@app.get("/calculate-calorie", response_class=HTMLResponse)
async def calculate_calorie(request: Request):
    return templates.TemplateResponse("calculatecalorie.html", {"request": request})

@app.post("/detect-food/")
async def detect_food(file: UploadFile = File(...)):
    upload_folder = os.path.join(BASE_DIR, "..", "temp_uploads")
    os.makedirs(upload_folder, exist_ok=True)
    
    file_path = os.path.join(upload_folder, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    results = model(file_path)
    
    detections = []
    for result in results:
        for box in result.boxes:
            cls_id = int(box.cls[0].item())
            label = model.names[cls_id]
            conf = float(box.conf[0].item())
            bbox = box.xyxy[0].tolist()
            detections.append({
                "label": label,
                "confidence": conf,
                "bbox": bbox
            })
    
    os.remove(file_path)
    
    return {"detections": detections}
