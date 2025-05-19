import os

def check_labels(label_dir, nc):
    error_files = set()
    max_class_id = -1
    for fname in os.listdir(label_dir):
        if not fname.endswith(".txt"):
            continue
        path = os.path.join(label_dir, fname)
        with open(path) as f:
            for line_num, line in enumerate(f, 1):
                parts = line.strip().split()
                if len(parts) != 5:
                    print(f"[ERROR] {fname}:{line_num} - Tidak ada 5 kolom")
                    error_files.add(fname)
                    continue
                try:
                    class_id = int(parts[0])
                    coords = list(map(float, parts[1:] ))
                except:
                    print(f"[ERROR] {fname}:{line_num} - Format angka salah")
                    error_files.add(fname)
                    continue

                if class_id < 0 or class_id >= nc:
                    print(f"[ERROR] {fname}:{line_num} - class_id {class_id} di luar range 0-{nc-1}")
                    error_files.add(fname)

                for c in coords:
                    if c < 0 or c > 1:
                        print(f"[ERROR] {fname}:{line_num} - Koordinat {c} out of range 0-1")
                        error_files.add(fname)

                if class_id > max_class_id:
                    max_class_id = class_id
    print(f"Max class ID ditemukan: {max_class_id}")
    if error_files:
        print(f"File dengan error: {sorted(error_files)}")
    else:
        print("Semua file label valid!")

if __name__ == "__main__":
    LABEL_DIR = "data/val/labels"  # sesuaikan path folder label validasi
    NUM_CLASSES = 20  # ganti dengan jumlah kelas kamu

    check_labels(LABEL_DIR, NUM_CLASSES)
