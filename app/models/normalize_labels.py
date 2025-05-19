import os

def normalize_label_file(file_path):
    with open(file_path, "r") as f:
        lines = f.readlines()

    normalized_lines = []
    changed = False

    for line in lines:
        parts = line.strip().split()
        if len(parts) != 5:
            continue
        class_id = parts[0]
        coords = list(map(float, parts[1:]))

        # Clip setiap koordinat ke range 0-1
        clipped_coords = [min(max(c, 0.0), 1.0) for c in coords]

        if clipped_coords != coords:
            changed = True

        normalized_lines.append(f"{class_id} " + " ".join(f"{c:.6f}" for c in clipped_coords) + "\n")

    if changed:
        with open(file_path, "w") as f:
            f.writelines(normalized_lines)
        print(f"File {file_path} telah dinormalisasi.")

def normalize_labels_in_folder(label_dir):
    for fname in os.listdir(label_dir):
        if fname.endswith(".txt"):
            normalize_label_file(os.path.join(label_dir, fname))

if __name__ == "__main__":
    LABEL_DIR = "data/val/labels"  # sesuaikan path label

    normalize_labels_in_folder(LABEL_DIR)