function FeaturesSection() {
    return React.createElement(
        "section",
        { id: "features", className: "py-5 bg-blue-50" },
        React.createElement(
            "div",
            { className: "container mx-auto px-6", style: {maxWidth: '1200px'} },
            // Fitur Utama
            React.createElement(
                "div",
                { className: "mb-12" },
                React.createElement(
                    "h3",
                    { className: "text-2xl font-bold text-gray-800 mb-6 text-center" },
                    "Fitur Utama Nutrify"
                ),
                React.createElement(
                    "div",
                    { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" },
                    [
                        { icon: "camera", title: "Deteksi dengan Kamera", desc: "Mengenali makanan dan minuman langsung dari kamera maupun galeri." },
                        { icon: "image", title: "Deteksi dengan Gambar", desc: "Data kalori, karbohidrat, protein, lemak, dan gula dari Fatsecret." },
                        { icon: "activity", title: "Kalkulator Kalori", desc: "Hitung kebutuhan kalori harian berdasarkan data pribadi pengguna." },
                        { icon: "sparkles", title: "Rekomendasi AI", desc: "Gemini AI memberi tips makan sehat & edukasi gizi langsung dari AI terbaru." }
                    ].map(function(feat, i) {
                        return React.createElement(
                            "div",
                            { className: "bg-white rounded-lg shadow p-8 flex flex-col items-center text-center fade-in", key: i },
                            React.createElement("div", { className: "w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full mb-4" },
                                React.createElement("i", { "data-lucide": feat.icon, className: "w-7 h-7 text-blue-600" })
                            ),
                            React.createElement("h3", { className: "font-semibold text-lg text-gray-800 mb-2" }, feat.title),
                            React.createElement("p", { className: "text-gray-600 text-sm" }, feat.desc)
                        );
                    })
                )
            )
        )
    );
}