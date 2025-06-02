import os
import requests
import re
from dotenv import load_dotenv

load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

def get_ai_eating_tips(food_label: str, nutrition: dict) -> str:
    import os
    import requests
    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    nut_str = (
        f"Kalori: {nutrition.get('calories', '-')}, "
        f"Protein: {nutrition.get('protein', '-')}, "
        f"Karbohidrat: {nutrition.get('carbohydrates', '-')}, "
        f"Lemak: {nutrition.get('fat', '-')}"
    )
    prompt = (
        f"Saya mendeteksi makanan '{food_label}' dengan kandungan nutrisi berikut: {nut_str}.\n\n"
        "Tampilkan hanya 3 tips makan sehat (tidak perlu penjelasan awal atau reasoning). "
        "Langsung tampilkan 3 tips singkat dalam format:\n"
        "• Tips pertama\n• Tips kedua\n• Tips ketiga\n"
        "TANPA ada penjelasan lain di awal atau akhir, dan tidak usah menulis 'manfaat', 'risiko', atau penutup."
    )
    data = {
        "model": "google/gemini-2.0-flash-exp:free",
        "messages": [
            {"role": "system", "content": "Kamu adalah ahli gizi yang sangat ramah dan komunikatif."},
            {"role": "user", "content": prompt}
        ]
    }
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        content = response.json()["choices"][0]["message"]["content"]
        return content
    else:
        print("ERROR:", response.status_code, response.text)
        return "Tips tidak tersedia saat ini. Silakan coba lagi nanti."

def extract_tips_from_ai_response(ai_response: str) -> list:
    """
    Ambil hanya tiga tips (tanpa reasoning) dari response AI.
    Output: list berisi string tips.
    """
    # Cari bagian setelah "Berikut tiga tips makan sehat terkait"
    tips_part = re.split(r"tips makan sehat terkait.*?:", ai_response, flags=re.IGNORECASE)
    if len(tips_part) > 1:
        tips_text = tips_part[1]
    else:
        # fallback: cari baris-baris yang diawali tanda *, -, atau nomor
        tips_text = ai_response

    # Pisahkan jadi list, tangkap baris yang diawali *, -, atau nomor
    tips_lines = re.findall(r"(?:\*+|\d+\.)\s*(.+)", tips_text)
    if not tips_lines:
        # fallback split manual jika gagal match
        tips_lines = [line.strip(" -•*") for line in tips_text.strip().split("\n") if line.strip()]
    # Ambil maksimal tiga tips saja
    return tips_lines[:3]

def clean_markdown(text: str) -> str:
    """
    Hilangkan markdown formatting seperti *, **, dan _ dari teks.
    """
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)  # bold
    text = re.sub(r'\*(.*?)\*', r'\1', text)      # italic
    text = re.sub(r'`(.*?)`', r'\1', text)        # inline code
    text = re.sub(r'^[-*]\s+', '', text, flags=re.MULTILINE)  # remove leading - or * in bullets
    return text.strip()

def get_calorie_tips(gender, age, height, weight, activity, goal) -> list:
    prompt = (
        f"Saya adalah seorang {gender.lower()} berusia {age} tahun, dengan tinggi {height} cm dan berat {weight} kg. "
        f"Aktivitas saya: {activity}. Tujuan saya: {goal}.\n\n"
        "Berikan 3 tips praktis dan singkat terkait pola makan dan gaya hidup untuk membantu mencapai tujuan tersebut.\n"
        "Jawaban hanya berupa 3 poin tips dalam bahasa Indonesia, tidak perlu pembuka atau penutup."
    )

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
            "Content-Type": "application/json"
        },
        json={
            "model": "google/gemini-2.0-flash-exp:free",
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
    )

    if response.ok:
        content = response.json()["choices"][0]["message"]["content"]
        # Ekstrak tips
        tips = re.findall(r"(?:\*+|\d+\.)\s*(.+)", content)
        if not tips:
            tips = [line.strip(" -•*") for line in content.strip().split("\n") if line.strip()]
        return tips[:3]
    
    return ["Tips tidak tersedia saat ini."]