from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from app.utils.roboflow import detect_food_labels
from app.utils.fatsecret_clients import search_calorie
from app.utils.openrouter_client import get_ai_eating_tips, extract_tips_from_ai_response, clean_markdown
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

# Load model functions (commented out YOLO, using Roboflow now)
# model = YOLO(os.path.join(BASE_DIR, "models", "best.pt"))

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
    # Replace this section with your new system or leave it empty if you're not using this route for now
    entries = [
        {"label": "Nasi Goreng", "calories": 250},
        {"label": "Ayam Bakar", "calories": 180},
        {"label": "Jus Alpukat", "calories": 160},
        # Add other food items with calories as needed
    ]
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

    # Call the detect_food_labels function to handle both Roboflow and YOLO detection
    detections = detect_food_labels(file_path)

    results = []
    for det in detections:
        label = det["label"]
        confidence = det["confidence"]
        
        # 1. Get nutrition from FatSecret
        nutrition = search_calorie(label)

        # 2. Get AI tips
        tips_list = []
        if nutrition:
            ai_response = get_ai_eating_tips(label, nutrition)
            raw_tips = extract_tips_from_ai_response(ai_response)
            tips_list = [clean_markdown(tip) for tip in raw_tips]

        results.append({
            "label": label,
            "confidence": confidence,
            "nutrition": nutrition,
            "tips": tips_list
        })

    os.remove(file_path)
    return {"detections": results}

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
