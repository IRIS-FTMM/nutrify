// ScanSection.js
function ScanSection() {
    return React.createElement(
        "section", 
        // Menambahkan ID pada section ini agar bisa disembunyikan
        { id: "scan-section", className: "py-16" }, 
        React.createElement(
            "div", 
            { className: "container mx-auto px-6 text-center max-w-xl" },
            React.createElement("h3", { className: "text-2xl font-bold text-gray-800 mb-4" }, "Pilih Mode Deteksi"),
            React.createElement("p", { className: "text-gray-600 mb-6" },
                "Anda dapat memindai makanan dengan kamera atau mengunggah gambar untuk analisis nutrisi instan."
            ),
            React.createElement(
                "div", 
                { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
                // Kartu untuk Pindai dengan Kamera
                React.createElement(
                    "div", 
                    // === PERUBAHAN: Menambahkan id dan cursor-pointer ===
                    { id: "scan-camera-btn", className: "flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all cursor-pointer" },
                    React.createElement("div", { className: "w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-3" },
                        React.createElement("i", { "data-lucide": "camera", className: "w-6 h-6 text-blue-600" })
                    ),
                    React.createElement("h4", { className: "text-lg font-semibold text-gray-800 mb-1 text-center" }, "Pindai dengan Kamera"),
                    React.createElement("p", { className: "text-gray-600 text-sm text-center" }, "Gunakan kamera perangkat Anda untuk deteksi makanan real-time.")
                ),
                // Kartu untuk Unggah Gambar
                React.createElement(
                    "div", 
                    // === PERUBAHAN: Menambahkan id dan cursor-pointer ===
                    { id: "scan-upload-btn", className: "flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-all cursor-pointer" },
                    React.createElement("div", { className: "w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-3" },
                        React.createElement("i", { "data-lucide": "image", className: "w-6 h-6 text-blue-600" })
                    ),
                    React.createElement("h4", { className: "text-lg font-semibold text-gray-800 mb-1 text-center" }, "Unggah Gambar"),
                    React.createElement("p", { className: "text-gray-600 text-sm text-center" }, "Unggah foto item makanan untuk dianalisis.")
                )
            )
        )
    );
}