# 🍽️ Indonesian Combination Food Detection

Deteksi otomatis berbagai makanan-minuman khas Indonesia menggunakan model YOLOv8, dilatih dengan dataset anotasi hasil kolaborasi di Roboflow.
Cocok untuk aplikasi food recognition, edukasi gizi, serta tracking konsumsi harian berbasis AI.

---

## 📦 Dataset & Model

* **Dataset:**
  777 gambar dengan 50+ kelas makanan & minuman Indonesia.
  Anotasi bounding box sudah rapi dan siap pakai untuk training & evaluasi.
* **Model:**
  Object Detection (Roboflow 3.0, Fast), mAP\@50 **81.4%**, Precision **76.4%**, Recall **76.6%**
  Model siap di-deploy lewat API Roboflow atau diunduh untuk inference lokal.

> **Link Project Roboflow:**
> [Indonesian Combination Food – Roboflow Universe](https://universe.roboflow.com/machinelearning-4tyun/indonesian-combination-food)

---

## 🚀 Cara Penggunaan

1. **Cek & Download Data/Model**

   * Masuk ke link Roboflow Universe di atas.
   * Download dataset dalam format YOLO, COCO, atau Pascal VOC (pilih sesuai kebutuhan).
   * Download pretrained weights atau copy model URL untuk API deployment.

2. **Inference dengan API Roboflow**

   * Daftar & dapatkan API key di Roboflow.
   * Contoh request (Python):

     ```python
     import requests

     api_key = "API_KEY_KAMU"
     image_url = "https://alamatgambar.com/gambar.jpg"
     project = "indonesian-combination-food"
     version = "9" # atau versi terbaru di Universe

     url = f"https://detect.roboflow.com/{project}/{version}?api_key={api_key}&image={image_url}"

     response = requests.get(url)
     print(response.json())
     ```
   * Atau upload gambar langsung via website Roboflow untuk tes cepat.

3. **Local Inference**

   * Download model weights, integrasikan dengan pipeline YOLOv8 (Ultralytics), atau gunakan notebook inference yang tersedia di repo ini.
   * Panduan notebook: [Colab Inference](https://github.com/arknsa/nutrify) (lihat di bagian notebook/colab).

---

## 📊 Ringkasan Hasil Training

* **Jumlah kelas:** 50+
* **Gambar:** 777
* **mAP\@50:** 81.4%
* **Precision:** 76.4%
* **Recall:** 76.6%

### Akurasi per Kelas (contoh):

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

**Catatan:**
Beberapa kelas minor perlu tambahan data agar performa model semakin merata di seluruh kelas.

---

## 🏷️ Daftar Kelas Lengkap

Terdiri dari berbagai makanan/minuman Indonesia populer, antara lain: nasi putih, ayam goreng, mie goreng, soto, lalapan, es teh, sambal, telur dadar, tempe goreng, dan lainnya.
[Lihat daftar lengkap di tab “Classes & Tags” pada Roboflow Universe.](https://universe.roboflow.com/machinelearning-4tyun/indonesian-combination-food/classes)

---

## 👥 Kontribusi & Pengembangan

* **Labeling & Data:**
  Siapapun boleh berkontribusi menambah data atau memperbaiki label melalui Roboflow.
* **Issue & Saran:**
  Silakan buka issue di [Github Nutrify](https://github.com/arknsa/nutrify) atau kirim saran lewat kontak di bawah.

---

## 📞 Kontak & Referensi

* **Author:** Kelompok 6 Machine Learning SD-A1
* **Roboflow Universe:** [https://universe.roboflow.com/machinelearning-4tyun/indonesian-combination-food](https://universe.roboflow.com/machinelearning-4tyun/indonesian-combination-food)
* **Github Project:** [https://github.com/arknsa/nutrify](https://github.com/arknsa/nutrify)

---

**Project open-source. Silakan gunakan untuk riset, pengembangan aplikasi gizi, maupun edukasi. Mention source jika digunakan secara publik!**

---