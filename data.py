import os
from dotenv import load_dotenv
from fatsecret import Fatsecret

load_dotenv()
consumer_key = os.getenv("FATSECRET_CONSUMER_KEY")
consumer_secret = os.getenv("FATSECRET_CONSUMER_SECRET")
fs = Fatsecret(consumer_key, consumer_secret)
foods = fs.foods_search("Tacos")
print(foods)