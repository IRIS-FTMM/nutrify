from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import shutil
import os
import cv2
import base64
import numpy as np

# Pastikan path import ini sesuai dengan struktur folder Anda
from app.models.models import detect_food_labels_from_image
from app.utils.fatsecret_clients import search_calorie
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

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "..", "templates"))
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "..", "static")), name="static")

@app.on_event("startup")
async def startup_event():
    """
    Fungsi ini akan dijalankan satu kali saat server FastAPI dimulai.
    """
    print("Server sedang memulai, memuat database makanan...")
    load_food_database()  # Panggil fungsi untuk memuat data ke memori
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
    upload_folder = os.path.join(BASE_DIR, "temp")
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, file.filename)

    try:
        # Simpan file yang diunggah
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # === Langkah 1: Deteksi pada gambar ukuran penuh ===
        detections = detect_food_labels_from_image(file_path)

        if not detections:
            raise HTTPException(status_code=404, detail="Tidak ada makanan yang terdeteksi.")

        # <-- BARU: Inisialisasi variabel untuk total nutrisi & nama makanan
        total_nutrition = {"calories": 0, "protein": 0, "carbohydrates": 0, "fat": 0}
        food_names_for_ai = []
        
        # === Langkah 2 & 3: Proses gambar untuk anotasi (logika Anda tetap dipertahankan) ===
        original_image = cv2.imread(file_path)
        h, w, _ = original_image.shape
        max_dimension = 640
        scaling_factor = 1.0
        if h > max_dimension or w > max_dimension:
            scaling_factor = max_dimension / (h if h > w else w)
        new_w, new_h = int(w * scaling_factor), int(h * scaling_factor)
        resized_image = cv2.resize(original_image, (new_w, new_h), interpolation=cv2.INTER_AREA)

        # === Langkah 4: Proses setiap deteksi untuk nutrisi dan gambar bounding box ===
        processed_detections = []
        for det in detections:
            food_label = det.get("label")
            if not food_label:
                continue

            # Cari informasi nutrisi dari spreadsheet Anda
            nutrition_info = search_calorie_from_sheet(food_label) or {}
            det["nutrition"] = nutrition_info
            
            # <-- BARU: Akumulasi total nutrisi jika makanan ditemukan di database
            if nutrition_info:
                total_nutrition["calories"] += nutrition_info.get("calories", 0)
                total_nutrition["protein"] += nutrition_info.get("protein", 0)
                total_nutrition["carbohydrates"] += nutrition_info.get("carbohydrates", 0)
                total_nutrition["fat"] += nutrition_info.get("fat", 0)
                food_names_for_ai.append(nutrition_info.get("food_name", food_label))
            
            # Tambahkan deteksi yang sudah diproses ke list
            processed_detections.append(det)

            # Gambar bounding box pada gambar yang sudah di-resize (logika Anda tetap dipertahankan)
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

        # <-- BARU: Langkah 5: Panggil AI untuk mendapatkan rekomendasi hidangan
        ai_recommendations = get_recommendations_for_meal(food_names_for_ai, total_nutrition)

        # === Langkah 6: Ubah gambar yang sudah di-resize dan dianotasi menjadi Base64 ===
        _, buffer_img = cv2.imencode('.jpg', resized_image)
        image_base64 = base64.b64encode(buffer_img).decode('utf-8')

        # === Langkah 7: Kirim response LENGKAP ke frontend ===
        return {
            "detections": processed_detections,
            "image_with_boxes": f"data:image/jpeg;base64,{image_base64}",
            "total_nutrition": total_nutrition,         # <-- BARU: Tambahkan total nutrisi ke response
            "ai_recommendations": ai_recommendations  # <-- BARU: Tambahkan rekomendasi AI ke response
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
    # Mengambil tips dari AI dengan menggunakan parameter yang diberikan
    raw_tips = get_calorie_tips(
        req.gender, req.age, req.height, req.weight, req.activity, req.goal
    )
    
    # Membersihkan tips dengan Markdown
    cleaned_tips = [clean_markdown(t) for t in raw_tips]
    
    return {"tips": cleaned_tips}
