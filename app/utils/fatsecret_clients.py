import os
import re
from dotenv import load_dotenv
from fatsecret import Fatsecret

load_dotenv()
consumer_key = os.getenv("FATSECRET_CONSUMER_KEY")
consumer_secret = os.getenv("FATSECRET_CONSUMER_SECRET")

fs = Fatsecret(consumer_key, consumer_secret)

def parse_nutrition(description: str):
    # Membuat dictionary untuk menyimpan informasi nutrisi
    nutrition = {
        "calories": "-",
        "fat": "-",
        "carbohydrates": "-",
        "protein": "-"
    }

    # Mencari informasi nutrisi dalam deskripsi menggunakan regex
    cal_match = re.search(r'Kalori:\s*([\d.]+)kkal', description)
    fat_match = re.search(r'Lemak:\s*([\d.]+)g', description)
    carbs_match = re.search(r'Karb:\s*([\d.]+)g', description)
    protein_match = re.search(r'Prot:\s*([\d.]+)g', description)

    if cal_match:
        nutrition["calories"] = float(cal_match.group(1))
    if fat_match:
        nutrition["fat"] = float(fat_match.group(1))
    if carbs_match:
        nutrition["carbohydrates"] = float(carbs_match.group(1))
    if protein_match:
        nutrition["protein"] = float(protein_match.group(1))

    return nutrition

def search_calorie(food_name: str):
    try:
        # Mencari makanan di API Fatsecret
        foods = fs.foods_search(food_name)
        print(f"FatSecret API response: {foods}")  # Log respons dari API

        if isinstance(foods, list):
            foods_data = foods
        elif isinstance(foods, dict):
            foods_dict = foods.get('foods')
            if not foods_dict:
                return None
            foods_data = foods_dict.get('food')
            if not foods_data:
                return None
            if isinstance(foods_data, dict):
                foods_data = [foods_data]
        else:
            return None

        # Menyaring hasil untuk mencari informasi dengan deskripsi "100 g"
        for food in foods_data:
            desc = food.get('food_description', '')
            if "100 g" in desc:
                serving = food.get('serving_description', 'Per 100 g')
                nutrition = parse_nutrition(desc)
                nutrition["food_name"] = food.get('food_name', food_name)
                nutrition["serving"] = serving
                nutrition["food_url"] = food.get('food_url', '')
                return nutrition

        # Jika tidak ditemukan yang "100 g", menggunakan hasil pertama
        food = foods_data[0]
        desc = food.get('food_description', 'No calorie info')
        serving = food.get('serving_description', 'Per serving')
        nutrition = parse_nutrition(desc)
        nutrition["food_name"] = food.get('food_name', food_name)
        nutrition["serving"] = serving
        nutrition["food_url"] = food.get('food_url', '')
        return nutrition

    except Exception as e:
        print(f"FatSecret API error: {e}")
        return None
