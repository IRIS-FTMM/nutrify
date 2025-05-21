import os
from dotenv import load_dotenv
from fatsecret import Fatsecret

load_dotenv()
consumer_key = os.getenv("FATSECRET_CONSUMER_KEY")
consumer_secret = os.getenv("FATSECRET_CONSUMER_SECRET")
fs = Fatsecret(consumer_key, consumer_secret)

def search_calorie(food_name: str):
    """
    Cari kalori makanan di FatSecret berdasarkan nama makanan
    """
    try:
        foods = fs.foods_search(food_name)
        if foods and foods['foods']['food']:
            # Ambil kalori dari makanan pertama
            food = foods['foods']['food'][0]
            calorie = food.get('food_description', 'No calorie info')
            return calorie
        return None
    except Exception as e:
        print(f"FatSecret API error: {e}")
        return None
