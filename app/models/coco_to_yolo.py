import json
import os

def convert_bbox_coco_to_yolo(bbox, img_width, img_height):
    """
    Convert COCO bbox [x_min, y_min, width, height] ke YOLO format
    [x_center, y_center, width, height], dinormalisasi 0-1.
    """
    x_min, y_min, width, height = bbox
    x_center = x_min + width / 2
    y_center = y_min + height / 2

    return [
        x_center / img_width,
        y_center / img_height,
        width / img_width,
        height / img_height,
    ]

def create_category_mapping(categories):
    """
    Buat mapping dari COCO category_id ke YOLO class_id (0..nc-1)
    """
    category_mapping = {}
    for idx, cat in enumerate(categories):
        category_mapping[cat['id']] = idx
    return category_mapping

def convert_annotations(json_path, images_dir, labels_dir):
    """
    Convert annotations.json COCO ke YOLO format txt files di labels_dir
    """
    with open(json_path) as f:
        data = json.load(f)

    category_mapping = create_category_mapping(data['categories'])
    images_info = {img['id']: img for img in data['images']}
    
    # Pastikan folder labels ada
    os.makedirs(labels_dir, exist_ok=True)

    # Kumpulkan annotations per image_id
    ann_per_image = {}
    for ann in data['annotations']:
        image_id = ann['image_id']
        if image_id not in ann_per_image:
            ann_per_image[image_id] = []
        ann_per_image[image_id].append(ann)

    for image_id, anns in ann_per_image.items():
        img_info = images_info[image_id]
        img_width = img_info['width']
        img_height = img_info['height']
        img_filename = img_info['file_name']

        label_filename = os.path.splitext(img_filename)[0] + ".txt"
        label_path = os.path.join(labels_dir, label_filename)

        with open(label_path, 'w') as label_file:
            for ann in anns:
                category_id = ann['category_id']
                if category_id not in category_mapping:
                    continue  # skip jika kategori tidak dikenali
                
                class_id = category_mapping[category_id]
                bbox = ann['bbox']
                bbox_yolo = convert_bbox_coco_to_yolo(bbox, img_width, img_height)

                # Format YOLO: <class_id> <x_center> <y_center> <width> <height>
                line = f"{class_id} " + " ".join(f"{x:.6f}" for x in bbox_yolo)
                label_file.write(line + "\n")

    print(f"Conversion finished. Labels saved to {labels_dir}")

if __name__ == "__main__":
    # Contoh konversi data train
    convert_annotations(
        json_path="data/train/annotations.json",
        images_dir="data/train/images",
        labels_dir="data/train/labels"  # kita buat folder labels di sini
    )

    # Contoh konversi data val
    convert_annotations(
        json_path="data/val/annotations.json",
        images_dir="data/val/images",
        labels_dir="data/val/labels"
    )
