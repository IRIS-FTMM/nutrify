# Gunakan base image Python resmi
FROM python:3.12-slim

# Set direktori kerja di dalam container
WORKDIR /app

# Salin file requirements terlebih dahulu untuk caching
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Salin semua kode aplikasi Anda
COPY . .

# (Opsional tapi direkomendasikan) Cara menangani model besar
# Jika file .pt terlalu besar untuk Git, unduh saat build
# RUN curl -L "URL_DOWNLOAD_YOLOV8S_PT_ANDA" -o app/models/yolov8s.pt

# Beri tahu Docker bahwa container berjalan di port 8000
EXPOSE 8000

# Jalankan aplikasi menggunakan Gunicorn saat container dimulai
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "app.main:app", "--bind", "0.0.0.0:8000"]