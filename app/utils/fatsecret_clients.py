# app/utils/fatsecret_clients.py (VERSI DIPERBAIKI TOTAL & LEBIH ANDAL)

import os
from dotenv import load_dotenv
from fatsecret import Fatsecret

load_dotenv()
consumer_key = os.getenv("FATSECRET_CONSUMER_KEY")
consumer_secret = os.getenv("FATSECRET_CONSUMER_SECRET")

fs = Fatsecret(consumer_key, consumer_secret)

def get_best_food_id(foods_list: list, food_name: str) -> str or None:
    """Mencari ID makanan yang paling relevan dari daftar hasil pencarian."""
    if not foods_list:
        return None
    
    # Prioritas 1: Cari yang namanya sama persis (case-insensitive)
    for food in foods_list:
        if isinstance(food, dict) and food.get('food_name', '').lower() == food_name.lower():
            return food.get('food_id')
    
    # Prioritas 2: Cari yang namanya mengandung kata kunci (misal: "telur" ada di "telur rebus")
    # Hindari hasil yang tidak relevan seperti "Teh" untuk "Selada"
    for food in foods_list:
        if isinstance(food, dict) and food_name.lower() in food.get('food_name', '').lower():
            # Cek sederhana untuk menghindari hasil yang aneh
            if 'tea' not in food.get('food_name', '').lower() and 'teh' not in food.get('food_name', '').lower():
                 return food.get('food_id')
            
    # Prioritas 3: Jika tidak ada, ambil hasil pertama saja (jika itu dictionary)
    if isinstance(foods_list[0], dict):
        return foods_list[0].get('food_id')
    return None

def get_best_serving(servings_list: list) -> dict or None:
    """Mencari serving yang paling relevan (prioritas: buah/potong -> 100g -> lainnya)."""
    if not servings_list:
        return None
        
    piece_keywords = ['buah', 'potong', 'biji', 'butir', 'porsi', 'besar', 'sedang', 'kecil', 'large', 'medium', 'small']
    
    # Prioritas 1: Cari serving per satuan
    for s in servings_list:
        desc = s.get('serving_description', '').lower()
        if any(keyword in desc for keyword in piece_keywords):
            return s

    # Prioritas 2: Cari serving '100 g'
    for s in servings_list:
        if '100 g' in s.get('serving_description', ''):
            return s
            
    # Prioritas 3: Ambil saja serving pertama yang tersedia
    return servings_list[0]

def search_calorie(food_name: str):
    """Fungsi yang sangat defensif untuk mencari informasi nutrisi dari Fatsecret."""
    try:
        # === Langkah 1: Cari daftar makanan di region Indonesia ===
        foods_search_result = fs.foods_search(food_name, region="ID", language="id")

        # <<< PERBAIKAN UTAMA 1: Penanganan struktur hasil pencarian yang fleksibel >>>
        foods_list = []
        if isinstance(foods_search_result, list):
            foods_list = foods_search_result
        elif isinstance(foods_search_result, dict):
            # API bisa mengembalikan {'foods': {'food': [...]}} atau {'foods': None}
            foods_data = foods_search_result.get('foods')
            if foods_data:
                foods_list = foods_data.get('food', [])
        
        # Jika setelah diproses tetap kosong, berarti tidak ditemukan
        if not foods_list:
            print(f"Fatsecret: Tidak ada hasil pencarian untuk '{food_name}'")
            return {}

        # Ambil food_id yang paling relevan
        food_id = get_best_food_id(foods_list, food_name)
        if not food_id:
            print(f"Fatsecret: Tidak ditemukan food_id yang cocok untuk '{food_name}'")
            return {}

        # === Langkah 2: Ambil detail nutrisi untuk food_id tersebut ===
        food_get_result = fs.food_get(food_id)
        
        # <<< PERBAIKAN UTAMA 2: Penanganan struktur hasil get yang fleksibel >>>
        food_data = {}
        if isinstance(food_get_result, dict):
            # API bisa mengembalikan {'food': {...}} atau langsung {...}
            food_data = food_get_result.get('food', food_get_result)

        if not food_data or 'servings' not in food_data:
            print(f"Fatsecret: Tidak ada detail nutrisi untuk food_id {food_id}")
            return {}

        servings = food_data['servings'].get('serving')
        # Standarkan ke list
        if isinstance(servings, dict):
            servings = [servings]

        # === Langkah 3: Pilih serving terbaik ===
        best_serving = get_best_serving(servings)
        if not best_serving:
            print(f"Fatsecret: Tidak ditemukan serving yang valid untuk food_id {food_id}")
            return {}

        # === Langkah 4: Ekstrak data nutrisi dengan aman ===
        serving_unit = 'gram'
        desc_lower = best_serving.get('serving_description','').lower()
        if any(kw in desc_lower for kw in ['buah', 'potong', 'biji', 'butir', 'porsi', 'besar', 'sedang', 'kecil']):
             serving_unit = 'buah'

        # Gunakan .get() dengan nilai default '0' untuk mencegah error
        nutrition_data = {
            "calories": float(best_serving.get('calories', '0')),
            "fat": float(best_serving.get('fat', '0')),
            "carbohydrates": float(best_serving.get('carbohydrate', '0')),
            "protein": float(best_serving.get('protein', '0')),
            "food_name": food_data.get('food_name', food_name),
            "serving_description": best_serving.get('serving_description', 'Info tidak tersedia'),
            "serving_unit": serving_unit,
            "food_url": food_data.get('food_url', '')
        }
        
        print(f"Nutrisi ditemukan untuk '{food_name}': {nutrition_data}")
        return nutrition_data

    except Exception as e:
        print(f"Terjadi error KESELURUHAN pada FatSecret API untuk '{food_name}': {e}")
        return {} # Kembalikan dictionary kosong jika terjadi error apa pun