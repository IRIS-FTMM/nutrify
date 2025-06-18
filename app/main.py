from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from app.models.models import detect_food_labels_from_image, detect_food_labels_from_video, draw_bounding_boxes
from app.utils.fatsecret_clients import search_calorie
from app.utils.openrouter_clients import get_ai_eating_tips, extract_tips_from_ai_response, clean_markdown, get_calorie_tips
from pydantic import BaseModel
import shutil
import os
import cv2
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
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "..", "static")), name="static")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/detect", response_class=HTMLResponse)
async def detect(request: Request):
    return templates.TemplateResponse("detect.html", {"request": request})

@app.get("/about", response_class=HTMLResponse)
async def about(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})

@app.get("/calculate-calorie", response_class=HTMLResponse)
async def calculate_calorie(request: Request):
    return templates.TemplateResponse("calculatecalorie.html", {"request": request})

@app.get("/foods-list", response_class=HTMLResponse)
async def foods_list(request: Request):
    return templates.TemplateResponse("foods-list.html", {"request": request})

@app.post("/detect-food/")
async def detect_food(file: UploadFile = File(...)):
    upload_folder = os.path.join(BASE_DIR, "temp")
    static_folder = os.path.join(BASE_DIR, "static", "images")  # New static folder for images
    os.makedirs(upload_folder, exist_ok=True)
    os.makedirs(static_folder, exist_ok=True)

    file_path = os.path.join(upload_folder, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Step 1: Run food detection on the uploaded image
    detections = detect_food_labels_from_image(file_path)

    # Step 2: Draw bounding boxes on the image
    image_with_boxes = draw_bounding_boxes(file_path, detections)

    # Save the image with bounding boxes to the static folder
    output_filename = "image_with_bounding_boxes.jpg"
    output_path = os.path.join(static_folder, output_filename)
    cv2.imwrite(output_path, image_with_boxes)  # OpenCV method to save image

    # Return detections and the correct URL to the image in static folder
    return {"detections": detections, "image_with_boxes": f"/static/images/{output_filename}"}


@app.post("/detect-food-video/")
async def detect_food_video():
    try:
        # Start detecting from the webcam (real-time)
        return await detect_food_labels_from_video(video_source=0)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error detecting food from video: {e}")

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
