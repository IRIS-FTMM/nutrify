import pandas as pd
from typing import Dict, Optional

# GANTI DENGAN URL CSV PUBLIKASI ANDA
SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6JWS_Mdhe7UnqE-qZ1RCFFYCjeMHq-Q3UlneT5EKrpDhSonKsS7Wzo0OyAfrBC0rJIJSb6WPWrgia/pub?gid=0&single=true&output=csv"

food_db = None

def load_food_database():
    """Membaca dan membersihkan data dari Google Sheet."""
    global food_db
    try:
        # URL CSV Anda
        SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT6JWS_Mdhe7UnqE-qZ1RCFFYCjeMHq-Q3UlneT5EKrpDhSonKsS7Wzo0OyAfrBC0rJIJSb6WPWrgia/pub?gid=0&single=true&output=csv"
        
        # Coba tambahkan parameter decimal=',' jika data Anda menggunakan koma
        food_db = pd.read_csv(SHEET_URL, decimal=',') 
        
        # ... (kode pembersihan Anda yang lain) ...
        food_db.columns = food_db.columns.str.strip().str.lower().str.replace(' ', '_')

        print("===== NAMA KOLOM YANG DIBACA PYTHON =====")
        print(food_db.columns) # <--- TAMBAHKAN BARIS INI
        print("========================================")

        print("Database makanan dari Google Sheet berhasil dimuat dan dibersihkan.")
    except Exception as e:
        print(f"Gagal memuat database dari Google Sheet: {e}")
        food_db = None
def search_calorie_from_sheet(food_name: str) -> Dict:
    """Mencari informasi nutrisi dari DataFrame dengan penanganan error yang baik."""
    global food_db
    if food_db is None:
        load_food_database()
    
    if food_db is None or food_db.empty:
        return {}

    # Pastikan tipe data kolom nama_makanan adalah string
    food_db['nama_makanan'] = food_db['nama_makanan'].astype(str)
    search_name = food_name.lower().strip()
    db_names = food_db['nama_makanan'].str.lower().str.strip()
    
    exact_match = food_db[db_names == search_name]
    
    result_row = None
    if not exact_match.empty:
        result_row = exact_match.iloc[0]
    else:
        substring_match = food_db[db_names.str.contains(search_name, na=False)]
        if not substring_match.empty:
            result_row = substring_match.iloc[0]
        else:
            print(f"Tidak ditemukan data untuk: {food_name}")
            return {}

    # Mengambil data dengan aman dan memastikan tipe datanya benar
    nutrition_data = {
        "calories": float(result_row.get('kalori_kkal', 0)),
        "fat": float(result_row.get('lemak_g', 0)),
        "carbohydrates": float(result_row.get('karbo_g', 0)),
        "protein": float(result_row.get('protein_g', 0)),
        "food_name": str(result_row.get('nama_makanan', food_name)),
        "serving_description": f"per {result_row.get('basis_jumlah', 1)} {result_row.get('display_unit', 'sajian')}",
        "serving_unit": str(result_row.get('basis_unit', 'satuan')),
        "base_amount": float(result_row.get('basis_jumlah', 1) if result_row.get('basis_jumlah', 0) > 0 else 1),
        "food_url": "" 
    }
    
    return nutrition_data