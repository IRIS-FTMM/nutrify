import os
import requests
from dotenv import load_dotenv

load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def get_nutrition_info(food_label: str) -> str:
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    prompt = (
        f"Langkah 1: Jelaskan secara singkat bagaimana kamu mencari kandungan kalori dan nutrisi dari makanan '{food_label}' berdasarkan sumber terpercaya seperti USDA FoodData Central. "
        f"Langkah 2: Berikan hasil akhirnya HANYA dalam format JSON dengan field: calories, protein, carbohydrates, fats, fiber, sugar. "
        f"Contoh format JSON: {{\"calories\": \"137 kcal\", \"protein\": \"2g\", \"carbohydrates\": \"16g\", \"fats\": \"7.3g\", \"fiber\": \"-\", \"sugar\": \"14g\"}}. "
        f"Jangan tambahkan penjelasan lain setelah JSON."
    )
    data = {
        "model": "google/gemini-2.0-flash-exp:free",
        "messages": [
            {"role": "system", "content": "Kamu adalah asisten nutrisi makanan."},
            {"role": "user", "content": prompt}
        ]
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        return "Gagal mengambil data nutrisi."