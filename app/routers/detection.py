from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.models import detect_food_labels_from_image, detect_food_labels_from_video
from app.utils.fatsecret_clients import search_calorie
from typing import List

router = APIRouter(prefix="/detect", tags=["detection"])

@router.post("/image/")
async def detect_calories_from_image(file: UploadFile = File(...)):
    try:
        # Simpan sementara gambar yang diupload
        contents = await file.read()
        image_path = f"temp/{file.filename}"
        with open(image_path, "wb") as f:
            f.write(contents)

        # Panggil model deteksi makanan pada gambar
        detections = detect_food_labels_from_image(image_path)

        results = []
        for det in detections:
            label = det["label"]
            confidence = det["confidence"]
            model = det["model"]  # Menyimpan model yang digunakan
            nutrition_info = search_calorie(label)
            results.append({"food": label, "confidence": confidence, "model": model, "nutrition": nutrition_info})

        # Hapus gambar sementara setelah diproses
        os.remove(image_path)
        return {"detected_foods": results}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error detecting food: {str(e)}")

@router.post("/video/")
async def detect_calories_from_video():
    try:
        # Memulai deteksi makanan dari video (kamera langsung)
        detections = detect_food_labels_from_video(video_source=0)
        return {"status": "Detection running on video", "message": "Press 'q' to stop the detection"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error detecting food from video: {e}")
