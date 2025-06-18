# 🍽️ Indonesian Combination Food Detection

Deteksi otomatis berbagai makanan-minuman khas Indonesia menggunakan model YOLO, dilatih dengan dataset kolaborasi di Roboflow.
Cocok untuk aplikasi food recognition, edukasi gizi, serta tracking konsumsi harian berbasis AI.

---

## 📦 Dataset & Model

* **Dataset:**
  777 gambar, 50+ kelas makanan & minuman Indonesia.
  Anotasi bounding box rapi dan siap untuk training & evaluasi.
* **Model:**
  Object Detection (Roboflow 3.0, Fast)
  mAP\@50 **85.1%**, Precision **75.7%**, Recall **77.7%**
  Model siap di-deploy via API Roboflow atau inference lokal.

> **Roboflow Universe:**
> [Indonesian Combination Food – Roboflow Universe](https://universe.roboflow.com/machinelearning-4tyun/indonesian-combination-food)

---

## 🛠️ Instalasi & Setup Lokal

1. **Clone Repository**

   ```bash
   git clone https://github.com/arknsa/nutrify.git
   cd nutrify
   ```

2. **Buat Virtual Environment (opsional tapi disarankan)**

   ```bash
   python -m venv env
   # Windows:
   .\env\Scripts\activate
   # Mac/Linux:
   # source env/bin/activate
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Download Model YOLO**

   * Download pretrained weights dari [Roboflow Universe](https://universe.roboflow.com/machinelearning-4tyun/indonesian-combination-food).
   * Letakkan file model (misal: `yolov8s.pt`) di folder `app/models/`.

---

## ▶️ Menjalankan Aplikasi Lokal

Jalankan server FastAPI dengan perintah:

```bash
uvicorn app.main:app --reload
```

Akses aplikasi di browser: [http://localhost:8000](http://localhost:8000)

---

## 🚀 Cara Penggunaan Lain (API Roboflow)

1. **Dapatkan API Key Roboflow**
   Daftar gratis di Roboflow dan dapatkan API key.
2. **Contoh inference (Python):**

   ```python
   import requests

   api_key = "API_KEY_KAMU"
   image_url = "https://alamatgambar.com/gambar.jpg"
   project = "indonesian-combination-food"
   version = "9" # atau versi terbaru

   url = f"https://detect.roboflow.com/{project}/{version}?api_key={api_key}&image={image_url}"

   response = requests.get(url)
   print(response.json())
   ```
3. Atau upload gambar langsung via website Roboflow.

---

## 📊 Ringkasan Hasil Training

* **Jumlah kelas:** 50+
* **Gambar:** 777
* **mAP\@50:** 85.1%
* **Precision:** 75.7%
* **Recall:** 77.7%

**Akurasi per Kelas (contoh):**

| Kelas          | mAP50 (%) |
| -------------- | --------- |
| Nasi putih     | 92.0      |
| Nasi goreng    | 100.0     |
| Ayam goreng    | 85.0      |
| Telur balado   | 100.0     |
| Donat          | 95.0      |
| Pisang         | 0.0       |
| Sambal kentang | 12.0      |
| ...            | ...       |

*Beberapa kelas minor perlu tambahan data untuk meningkatkan performa model.*

---

## 🏷️ Daftar Kelas

Terdiri dari berbagai makanan/minuman Indonesia: nasi putih, ayam goreng, mie goreng, soto, lalapan, es teh, sambal, telur dadar, tempe goreng, dll.
[Lihat lengkap di tab “Classes & Tags” Roboflow.](https://universe.roboflow.com/machinelearning-4tyun/indonesian-combination-food/classes)

---

## 🗂️ Struktur Project

```
nutrify/
├── app/
│   ├── main.py
│   ├── models/          # Tempat file model YOLO disimpan
│   ├── routers/
│   └── utils/
├── env/                 # Virtual environment (opsional, ignore di git)
├── static/
│   └── assets/
│       ├── css/
│       └── js/
├── templates/
│   ├── home.html
│   ├── detect.html
│   ├── about.html
│   └── information.html
├── .gitattributes
├── .gitignore
├── README.md
├── requirements.txt
└── tailwind.config.js
```

---

## 👥 Kontribusi & Pengembangan

* **Labeling & Data:**
  Siapa pun bisa menambah data/label di Roboflow.
* **Saran & Issue:**
  [Github Nutrify](https://github.com/arknsa/nutrify) atau kontak di bawah.

---

## 📞 Kontak & Referensi

* **Author:** Kelompok 6 Machine Learning SD-A1
* **Roboflow Universe:** [Indonesian Combination Food](https://universe.roboflow.com/machinelearning-4tyun/indonesian-combination-food)
* **Github Project:** [https://github.com/arknsa/nutrify](https://github.com/arknsa/nutrify)

---

**Project open-source. Silakan digunakan untuk riset, aplikasi gizi, atau edukasi. Mention source jika digunakan secara publik!**

---