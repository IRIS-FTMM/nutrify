from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import shutil
import os
import cv2
import base64
from pathlib import Path # Import pathlib

# Pastikan path import ini sesuai dengan struktur folder Anda
from app.models.models import detect_food_labels_from_image
from app.utils.openrouter_clients import get_ai_eating_tips, clean_markdown, get_recommendations_for_meal, get_calorie_tips
from app.utils.spreadsheet_clients import load_food_database, search_calorie_from_sheet
from pydantic import BaseModel

app = FastAPI(title="Nutrify")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === PERBAIKAN PATH FINAL ADA DI SINI ===
# Dapatkan path ke direktori root proyek (nutrify - Copy)
# Path(__file__) adalah app/main.py -> .parent adalah app/ -> .parent adalah root proyek
PROJECT_ROOT = Path(__file__).resolve().parent.parent 

# Tentukan path ke folder templates secara langsung dari root
TEMPLATES_DIR = PROJECT_ROOT / "templates"
templates = Jinja2Templates(directory=TEMPLATES_DIR)

# Mount folder static secara terpisah
# Ini akan mencari folder bernama 'static' di root proyek Anda
app.mount("/static", StaticFiles(directory=(PROJECT_ROOT / "static")), name="static")
# ======================================

@app.on_event("startup")
async def startup_event():
    """
    Fungsi ini akan dijalankan satu kali saat server FastAPI dimulai.
    """
    print("Server sedang memulai, memuat database makanan...")
    # load_food_database()  
    # Panggil fungsi untuk memuat data ke memori
    print("Database makanan berhasil dimuat ke dalam cache.")


# --- Endpoint untuk halaman HTML (tidak diubah) ---
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


@app.post("/detect/image/")
async def detect_food_and_get_nutrition(file: UploadFile = File(...)):
    """
    Endpoint untuk mendeteksi makanan, mendapatkan nutrisi, dan memberikan rekomendasi AI.
    """
    # Persiapkan folder untuk menyimpan file sementara
    upload_folder = PROJECT_ROOT / "app" / "temp"
    upload_folder.mkdir(exist_ok=True)
    file_path = upload_folder / file.filename

    try:
        # Simpan file yang diunggah
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # === Langkah 1: Deteksi pada gambar ukuran penuh ===
        detections = detect_food_labels_from_image(str(file_path))

        if not detections:
            raise HTTPException(status_code=404, detail="Tidak ada makanan yang terdeteksi.")

        # Inisialisasi variabel untuk total nutrisi & nama makanan
        total_nutrition = {"calories": 0, "protein": 0, "carbohydrates": 0, "fat": 0}
        food_names_for_ai = []
        
        # Proses gambar untuk anotasi
        original_image = cv2.imread(str(file_path))
        h, w, _ = original_image.shape
        max_dimension = 640
        scaling_factor = 1.0
        if h > max_dimension or w > max_dimension:
            scaling_factor = max_dimension / (h if h > w else w)
        new_w, new_h = int(w * scaling_factor), int(h * scaling_factor)
        resized_image = cv2.resize(original_image, (new_w, new_h), interpolation=cv2.INTER_AREA)

        # Proses setiap deteksi untuk nutrisi dan gambar bounding box
        processed_detections = []
        for det in detections:
            food_label = det.get("label")
            if not food_label:
                continue

            nutrition_info = search_calorie_from_sheet(food_label) or {}
            det["nutrition"] = nutrition_info
            
            if nutrition_info:
                total_nutrition["calories"] += nutrition_info.get("calories", 0)
                total_nutrition["protein"] += nutrition_info.get("protein", 0)
                total_nutrition["carbohydrates"] += nutrition_info.get("carbohydrates", 0)
                total_nutrition["fat"] += nutrition_info.get("fat", 0)
                food_names_for_ai.append(nutrition_info.get("food_name", food_label))
            
            processed_detections.append(det)

            box = det['bounding_box']
            x_center, y_center = box['x'], box['y']
            width, height = box['width'], box['height']
            x1_orig, y1_orig = x_center - width / 2, y_center - height / 2
            x2_orig, y2_orig = x_center + width / 2, y_center + height / 2
            x1_scaled, y1_scaled = int(x1_orig * scaling_factor), int(y1_orig * scaling_factor)
            x2_scaled, y2_scaled = int(x2_orig * scaling_factor), int(y2_orig * scaling_factor)
            
            cv2.rectangle(resized_image, (x1_scaled, y1_scaled), (x2_scaled, y2_scaled), (0, 255, 0), 2)
            label_text = f"{det['label']} {det['confidence']:.0%}"
            cv2.putText(resized_image, label_text, (x1_scaled, y1_scaled - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (36,255,12), 2)

        # Panggil AI untuk mendapatkan rekomendasi hidangan
        ai_recommendations = get_recommendations_for_meal(food_names_for_ai, total_nutrition)

        # Ubah gambar yang sudah di-resize dan dianotasi menjadi Base64
        _, buffer_img = cv2.imencode('.jpg', resized_image)
        image_base64 = base64.b64encode(buffer_img).decode('utf-8')

        # Kirim response LENGKAP ke frontend
        return {
            "detections": processed_detections,
            "image_with_boxes": f"data:image/jpeg;base64,{image_base64}",
            "total_nutrition": total_nutrition,
            "ai_recommendations": ai_recommendations
        }

    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        print(f"Internal Server Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan internal saat memproses gambar: {str(e)}")
    finally:
        if os.path.exists(file_path):
            os.remove(file_path) 


class CalorieRequest(BaseModel):
    gender: str
    age: int
    height: int
    weight: int
    activity: float
    goal: str
    tdee: int
    goal_calories: int


@app.post("/generate-calorie-tips/")
async def generate_calorie_tips(req: CalorieRequest):
    """
    Endpoint untuk menghasilkan tips makan berdasarkan parameter yang diberikan.
    """
    raw_tips = get_calorie_tips(
        req.gender, req.age, req.height, req.weight, req.activity, req.goal
    )
    
    cleaned_tips = [clean_markdown(t) for t in raw_tips]
    
    return {"tips": cleaned_tips}

