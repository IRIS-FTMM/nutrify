// Menggunakan Intersection Observer API untuk animasi saat scroll
// Ini adalah cara modern dan sangat efisien

// 1. Pilih semua elemen yang ingin dianimasikan
const animatedElements = document.querySelectorAll('.hidden');

// 2. Buat observer baru
const observer = new IntersectionObserver((entries) => {
    // 3. Loop melalui setiap 'entry' (elemen yang diamati)
    entries.forEach((entry) => {
        // 4. Jika elemen masuk ke dalam layar (isIntersecting)
        if (entry.isIntersecting) {
            // 5. Tambahkan class 'visible' untuk memicu animasi CSS
            entry.target.classList.add('visible');
            // 6. (Opsional) Berhenti mengamati elemen ini setelah animasi berjalan
            //    agar tidak berulang dan lebih hemat performa.
            observer.unobserve(entry.target);
        }
    });
}, {
    // Opsi: Memicu animasi sedikit lebih awal (misal, 100px sebelum elemen benar-benar terlihat)
    rootMargin: '0px 0px -100px 0px',
});

// 7. Minta observer untuk mulai mengamati setiap elemen yang kita pilih
animatedElements.forEach((el) => observer.observe(el));