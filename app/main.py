from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from app.utils.fatsecret_clients import search_calorie
from app.utils.openrouter_client import get_ai_eating_tips, extract_tips_from_ai_response, clean_markdown, get_calorie_tips
from ultralytics import YOLO
from pydantic import BaseModel
import shutil
import os
import json

app = FastAPI()

# Setup CORS (ubah allow_origins sesuai domain frontend kamu)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CalorieRequest(BaseModel):
    gender: str
    age: int
    height: int
    weight: int
    activity: float
    goal: str
    tdee: int
    goal_calories: int
    
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

@app.get("/detect", response_class=HTMLResponse)
async def detect(request: Request):
    return templates.TemplateResponse("detect.html", {"request": request})

@app.get("/about", response_class=HTMLResponse)
async def about(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})

@app.get("/calculate-calorie", response_class=HTMLResponse)
async def calculate_calorie(request: Request):
    return templates.TemplateResponse("calculatecalorie.html", {"request": request})
@app.get("/information", response_class=HTMLResponse)
async def information(request: Request):
    with open("data/val/annotations.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    category_lookup = {c["id"]: c["name_readable"] for c in data["categories"]}
    image_map = {img["id"]: img["file_name"] for img in data["images"]}

    # Ambil 1 label per image
    entries = []
    seen = set()
    for ann in data["annotations"]:
        img_id = ann["image_id"]
        if img_id in seen:
            continue
        seen.add(img_id)
        if img_id in image_map:
            filename = image_map[img_id]
            label = category_lookup.get(ann["category_id"], "Unknown")
            entries.append({
                "file": f"images/{filename}",
                "label": label
            })

    return templates.TemplateResponse("information.html", {
        "request": request,
        "entries": entries
    })
    
@app.post("/detect-food/")
async def detect_food(file: UploadFile = File(...)):
    upload_folder = os.path.join(BASE_DIR, "..", "temp")
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

            # 1. Ambil nutrisi FatSecret
            nutrition = search_calorie(label)

            # 2. Ambil tips AI
            # Untuk keamanan, pastikan nutrisi tidak None
            tips_list = []
            if nutrition:
                ai_response = get_ai_eating_tips(label, nutrition)
                raw_tips = extract_tips_from_ai_response(ai_response)
                tips_list = [clean_markdown(tip) for tip in raw_tips]

            detections.append({
                "label": label,
                "confidence": conf,
                "bbox": bbox,
                "nutrition": nutrition,
                "tips": tips_list
            })

    os.remove(file_path)
    return {"detections": detections}

@app.post("/generate-calorie-tips/")
async def generate_calorie_tips(req: CalorieRequest):
    raw_tips = get_calorie_tips(
        req.gender,
        req.age,
        req.height,
        req.weight,
        req.activity,
        req.goal
    )
    cleaned_tips = [clean_markdown(t) for t in raw_tips]
    return {"tips": cleaned_tips}