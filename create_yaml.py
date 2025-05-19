import json

with open("data/train/annotations.json") as f:
    data = json.load(f)

categories = data["categories"]

# Sort categories by their id supaya urutan konsisten (opsional)
categories = sorted(categories, key=lambda x: x["id"])

# Ambil nama kelas sesuai urutan
names = [cat["name_readable"].lower() for cat in categories]

nc = len(names)

yaml_content = f"""train: data/train/images
val: data/val/images

nc: {nc}
names: {names}
"""

with open("food_dataset.yaml", "w") as f:
    f.write(yaml_content)

print("food_dataset.yaml berhasil dibuat:")
print(yaml_content)
