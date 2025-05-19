from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
from app.models.yolo import detect_food_labels
from app.utils.fatsecret_client import search_calorie

router = APIRouter(prefix="/detect", tags=["detection"])

@router.post("/")
async def detect_calories(file: UploadFile = File(...)):
    # Simpan sementara gambar yang diupload
    contents = await file.read()
    image_path = f"temp/{file.filename}"
    with open(image_path, "wb") as f:
        f.write(contents)
    
    # Panggil model deteksi makanan, output: list label makanan
    try:
        labels = detect_food_labels(image_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    # Query kalori dari FatSecret untuk tiap label
    results = []
    for label in labels:
        calorie_info = search_calorie(label)
        if calorie_info:
            results.append({"food": label, "calories": calorie_info})
    
    return {"detected_foods": results}
