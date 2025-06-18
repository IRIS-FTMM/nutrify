<h1 align="center"> Discover Your Food's Nutritional Secrets with Nutrify </h1>

<p align="center">
  <!-- Logo icon used from lucide -->
  <i data-lucide="camera" class="w-8 h-8 text-blue-600"></i>
  <br>
</p>

<p align="center">
  <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Made%20with-Python-1f425f.svg" alt="Python" /></a>
</p>

---

## 🚀 Deskripsi Singkat

**Nutrify** adalah aplikasi web yang memanfaatkan machine learning untuk mendeteksi makanan/minuman dari gambar, menampilkan estimasi kalori, serta memberikan informasi nutrisi dan tips pola makan sehat. Cocok untuk edukasi, diet, maupun tracking konsumsi harian.

---

## 📦 Dataset & Model

- **Dataset:**  
  Download dataset dari Google Drive berikut, lalu extract file zip-nya:  
  [Dataset Nutrify](https://drive.google.com/drive/folders/1Z43ouoE8ZcFG0lflYQWT6riagTQ2ozlJ?usp=sharing)

- **Model YOLOv8s:**  
  Download file model YOLOv8s (`yolov8s.pt`) dari sini:  
  [Model YOLOv8s](https://drive.google.com/drive/folders/1o_YBf35rMEGAwW9R-FhN_ZuG0BQBSBBA)  
  Letakkan file model di folder `app/models/`.

---

## 🛠️ Instalasi

Tampaknya kamu ingin membuat format nomor yang konsisten dalam daftar yang kamu buat pada file markdown (seperti yang ada di dalam gambar). Untuk membuatnya konsisten, kamu bisa mengubahnya dengan cara menambahkan baris kosong atau pemisah antara setiap langkah.

Berikut adalah contoh format yang bisa digunakan agar setiap langkah memiliki jarak seperti nomor 1:

1. **Clone repository:**
  ```bash
   git clone https://github.com/arknsa/nutrify.git
   cd nutrify
  ```

2. **Buat virtual environment (opsional):**

   ```bash
   python -m venv env
   .\env\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```
4. **Minta API Key ke @arknsa_**

---

## ▶️ Menjalankan Aplikasi

```bash
uvicorn app.main:app --reload
```

Akses aplikasi di [http://localhost:8000](http://localhost:8000).

---

## 🗂️ Struktur Project

```
Nutrify/
├── app/
│   ├── main.py
│   ├── models/
│   ├── routers/
│   └── utils/
├── env/
├── static/
│   └── assets/
│   │   └── css/
│   │   └── js/
├── templates/
│   ├── home.html
│   ├── detect.html
│   ├── about.html
│   ├── information.html
├── .gitattributes
├── .gitignore
├── README.md
├── requirements.txt
└── tailwind.config.js

```

---

## ✨ Fitur Utama

* Deteksi otomatis makanan/minuman dari gambar (upload/camera)
* Estimasi kalori & nutrisi (protein, karbohidrat, lemak, serat, gula)
* Tips pola makan sehat
* Daftar informasi makanan/minuman

---

## 🌟 Logs Detail

Terdapat 3 versi implementasi:

1. **Versi awal:** Training dengan template deteksi objek sendiri, source code model dari repo Ultralytics, dataset format COCO, ensemble 4 model, label enhancement dengan EfficientNet-B4 classifier.
2. **Big refactor:** Update training, test-time augmentation, akurasi lebih baik, integrasi dari repo Ultralytics.
3. **Versi Theseus:** Template Theseus, mendukung food detection, classification, semantic segmentation, lebih robust, adaptasi dari project besar seperti mmocr, fairseq, timm, paddleocr, dll.

---

## 📔 Notebook

* Untuk inference, gunakan notebook ini:
  [Colab Inference](https://colab.research.google.com/drive/1X06Y-HSPeHbEWtsXpyal8R1PliiVvpJq?usp=sharing)
* Untuk training, referensi notebook:

  * [Detection](https://drive.google.com/file/d/1SywGfyfj3SVrE7VAAl3CshB9s3o8WRXL/view?usp=sharing)
  * [Classification](https://colab.research.google.com/drive/11VzRR8NmJyZGJ-3obkuV0zZAlYAPhCY1?usp=sharing)
  * [Semantic segmentation](https://colab.research.google.com/drive/16xe6WL5mAAmpm-ab0xo1LONV3tAtI-4O?usp=sharing)

---

## 📙 Credits

* Custom template: [theseus](https://github.com/kaylode/theseus) <mcreference link="https://github.com/kaylode/theseus" index="0">0</mcreference>
* YOLOv5: [ultralytics/yolov5](https://github.com/ultralytics/yolov5) <mcreference link="https://github.com/ultralytics/yolov5" index="1">1</mcreference>
* YOLOv8: [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) <mcreference link="https://github.com/ultralytics/ultralytics" index="2">2</mcreference>
* Timm models: [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) <mcreference link="https://github.com/ultralytics/ultralytics" index="2">2</mcreference>
* Segmentation models: [segmentation\_models.pytorch](https://github.com/qubvel/segmentation_models.pytorch) <mcreference link="https://github.com/qubvel/segmentation_models.pytorch" index="3">3</mcreference>
* Edamam API: [Edamam Food Database API](https://developer.edamam.com/food-database-api-docs) <mcreference link="https://developer.edamam.com/food-database-api-docs" index="4">4</mcreference>
* Chart.js: [Chart.js](https://github.com/chartjs/Chart.js) <mcreference link="https://github.com/chartjs/Chart.js" index="5">5</mcreference>

---

**Dibuat untuk Final Project Machine Learning.**

```
