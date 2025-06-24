# routes/detection.py

import os
import cv2
import base64
import numpy as np
from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List

# Pastikan path import ini sesuai dengan struktur folder Anda
# Jika models.py ada di folder app/models/, maka path ini sudah benar
from app.models.models import detect_food_labels_from_image, draw_bounding_boxes

router = APIRouter(prefix="/detect", tags=["detection"])

@router.post("/image/")
async def detect_food_from_image_endpoint(file: UploadFile = File(...)):
    # Membuat direktori 'temp' jika belum ada
    if not os.path.exists("temp"):
        os.makedirs("temp")
        
    image_path = f"temp/{file.filename}"

    try:
        # Menyimpan file yang diunggah ke path sementara
        with open(image_path, "wb") as f:
            contents = await file.read()
            f.write(contents)

        # 1. Panggil model untuk mendapatkan data deteksi (label, confidence, box)
        detections = detect_food_labels_from_image(image_path)

        # Jika model tidak mendeteksi apa pun, kirim error yang jelas
        if not detections:
            raise HTTPException(status_code=404, detail="Tidak ada makanan yang terdeteksi")

        # 2. Gambar bounding box pada gambar menggunakan data deteksi
        annotated_image_np = draw_bounding_boxes(image_path, detections)

        # 3. Ubah gambar yang sudah digambar menjadi string Base64
        _, buffer = cv2.imencode('.jpg', annotated_image_np)
        image_base64 = base64.b64encode(buffer).decode('utf-8')
        
        # 4. Ambil informasi nutrisi untuk setiap item yang terdeteksi
        # (Sesuai permintaan, kita kesampingkan dulu. Tapi ini adalah tempat yang benar untuk meletakkannya)
        # for det in detections:
        #     det['nutrition'] = search_calorie(det['label'])
            
        # 5. Siapkan struktur JSON final untuk dikirim ke frontend
        final_response = {
            "image_with_boxes": f"data:image/jpeg;base64,{image_base64}",
            "detections": detections
        }

        return final_response

    except Exception as e:
        # Tangkap error spesifik dari atas dan error umum lainnya
        if isinstance(e, HTTPException):
            raise e
        print(f"Error internal: {e}") # Log error untuk debugging di server
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan saat memproses gambar: {str(e)}")
    
    finally:
        # Pastikan file sementara selalu dihapus
        if os.path.exists(image_path):
            os.remove(image_path)