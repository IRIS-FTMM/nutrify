<h1 align="center"> Discover Your Food's Nutritional Secrets with Calorie-Cam </h1>

<p align="center">
  <a><img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"></a>
  <br>
</p>

<p align="center">
  <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Made%20with-Python-1f425f.svg" alt="Python" /></a>
</p>

---

## 🚀 Deskripsi Singkat

**Calorie-Cam** adalah aplikasi web yang memanfaatkan machine learning untuk mendeteksi makanan/minuman dari gambar, menampilkan estimasi kalori, serta memberikan informasi nutrisi dan tips pola makan sehat. Cocok untuk edukasi, diet, maupun tracking konsumsi harian.

---

## 📦 Dataset & Model

- **Dataset:**  
  Download dataset dari Google Drive berikut, lalu extract file zip-nya:  
  [Dataset Calorie-Cam](https://drive.google.com/drive/folders/1Z43ouoE8ZcFG0lflYQWT6riagTQ2ozlJ?usp=sharing)

- **Model YOLOv8s:**  
  Download file model YOLOv8s (`yolov8s.pt`) dari sini:  
  [Model YOLOv8s](https://drive.google.com/drive/folders/1o_YBf35rMEGAwW9R-FhN_ZuG0BQBSBBA)  
  Letakkan file model di folder `app/models/`.

---

## 🛠️ Instalasi

1. **Clone repository:**
   ```bash
   git clone https://github.com/arknsa/calorie-cam.git
   cd Calorie-Cam
   ```

2. **Buat virtual environment (opsional):**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Download dan letakkan model YOLOv8s di `app/models/`**


---

## ▶️ Menjalankan Aplikasi

```bash
uvicorn app.main:app --reload
```
Akses aplikasi di [http://localhost:8000](http://localhost:8000).

---

## 🗂️ Struktur Project

```
Calorie-Cam/
├── app/
│   ├── main.py
│   ├── models/
│   ├── routers/
│   └── utils/
├── templates/
│   ├── home.html
│   ├── detect.html
│   ├── about.html
│   ├── information.html
│   └── assets/
├── requirements.txt
├── .gitignore
└── README.md
```

---

## ✨ Fitur Utama

- Deteksi otomatis makanan/minuman dari gambar (upload/camera)
- Estimasi kalori & nutrisi (protein, karbohidrat, lemak, serat, gula)
- Tips pola makan sehat
- Daftar informasi makanan/minuman

---

## 🌟 Logs Detail

Terdapat 3 versi implementasi:
1. **Versi awal:** Training dengan template deteksi objek sendiri, source code model dari repo Ultralytics, dataset format COCO, ensemble 4 model, label enhancement dengan EfficientNet-B4 classifier.
2. **Big refactor:** Update training, test-time augmentation, akurasi lebih baik, integrasi dari repo Ultralytics.
3. **Versi Theseus:** Template Theseus, mendukung food detection, classification, semantic segmentation, lebih robust, adaptasi dari project besar seperti mmocr, fairseq, timm, paddleocr, dll.

---

## 📔 Notebook

- Untuk inference, gunakan notebook ini:  
  [Colab Inference](https://colab.research.google.com/drive/1X06Y-HSPeHbEWtsXpyal8R1PliiVvpJq?usp=sharing)
- Untuk training, referensi notebook:  
  - [Detection](https://drive.google.com/file/d/1SywGfyfj3SVrE7VAAl3CshB9s3o8WRXL/view?usp=sharing)
  - [Classification](https://colab.research.google.com/drive/11VzRR8NmJyZGJ-3obkuV0zZAlYAPhCY1?usp=sharing)
  - [Semantic segmentation](https://colab.research.google.com/drive/16xe6WL5mAAmpm-ab0xo1LONV3tAtI-4O?usp=sharing)

---

## 🥇 Pretrained-weights

- [YOLOv8s.pt (Google Drive)](https://drive.google.com/drive/folders/1o_YBf35rMEGAwW9R-FhN_ZuG0BQBSBBA?usp=sharing)
- [Kumpulan model lain (Google Drive)](https://drive.google.com/drive/folders/15PlXWkFheuBxJOYkwm9iS_aZCcr8L0A7?usp=sharing)

---

## 📙 Credits

- Custom template: [theseus](https://github.com/kaylode/theseus) <mcreference link="https://github.com/kaylode/theseus" index="0">0</mcreference>
- YOLOv5: [ultralytics/yolov5](https://github.com/ultralytics/yolov5) <mcreference link="https://github.com/ultralytics/yolov5" index="1">1</mcreference>
- YOLOv8: [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) <mcreference link="https://github.com/ultralytics/ultralytics" index="2">2</mcreference>
- Timm models: [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) <mcreference link="https://github.com/ultralytics/ultralytics" index="2">2</mcreference>
- Segmentation models: [segmentation_models.pytorch](https://github.com/qubvel/segmentation_models.pytorch) <mcreference link="https://github.com/qubvel/segmentation_models.pytorch" index="3">3</mcreference>
- Edamam API: [Edamam Food Database API](https://developer.edamam.com/food-database-api-docs) <mcreference link="https://developer.edamam.com/food-database-api-docs" index="4">4</mcreference>
- Chart.js: [Chart.js](https://github.com/chartjs/Chart.js) <mcreference link="https://github.com/chartjs/Chart.js" index="5">5</mcreference>

---

**Dibuat untuk Final Project Machine Learning.**
