# Tahap 1: Base Image
# Menggunakan image Python 3.10 versi slim sebagai dasar.
# Versi slim lebih kecil dan cocok untuk production.
FROM python:3.10-slim

# Menetapkan direktori kerja di dalam container.
# Semua perintah selanjutnya akan dijalankan dari direktori ini.
WORKDIR /app

# Menginstal dependensi sistem yang dibutuhkan oleh OpenCV (cv2).
# Ini adalah langkah penting agar pip install opencv-python berhasil.
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Menyalin file requirements.txt terlebih dahulu.
# Ini memanfaatkan cache Docker. Jika file ini tidak berubah,
# Docker tidak akan menginstal ulang dependensi setiap kali build.
COPY requirements.txt .

# Menginstal dependensi Python dari requirements.txt.
# --no-cache-dir digunakan agar image lebih kecil.
RUN pip install --no-cache-dir -r requirements.txt

# Menyalin seluruh kode aplikasi dan folder static ke dalam direktori kerja (/app).
# Pastikan struktur folder di dalam container sesuai dengan yang diharapkan oleh kode.
# Kode Anda berada di dalam folder 'app', dan file statis di folder 'static'.
COPY app/ ./app/
COPY static/ ./static/
COPY templates/ ./templates/

# Memberitahu Docker bahwa container akan berjalan di port 8000.
EXPOSE 8000

# Perintah untuk menjalankan aplikasi saat container dimulai.
# Menggunakan uvicorn untuk menjalankan server ASGI (FastAPI).
# Host 0.0.0.0 membuat aplikasi dapat diakses dari luar container.
# Path ke aplikasi adalah app.main:app karena file main.py ada di dalam folder app.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]