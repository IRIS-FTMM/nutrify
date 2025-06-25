# Tahap 1: Base Image
FROM python:3.10-slim

# Menetapkan direktori kerja di dalam container.
WORKDIR /app

# Menginstal dependensi sistem yang dibutuhkan oleh OpenCV (cv2).
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Menyalin file requirements.txt terlebih dahulu untuk caching.
COPY requirements.txt .

# Menginstal dependensi Python.
RUN pip install --no-cache-dir -r requirements.txt

# Menyalin seluruh kode aplikasi.
COPY app/ ./app/
COPY static/ ./static/
COPY templates/ ./templates/

# Perintah untuk menjalankan aplikasi.
# PENTING: Gunakan $PORT dari Railway, bukan 8000.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]