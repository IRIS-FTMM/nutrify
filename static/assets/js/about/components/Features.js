function Features() {
    var features = [
        { icon: "camera", title: "Deteksi Otomatis", desc: "Mengenali makanan dan minuman langsung dari kamera maupun galeri." },
        { icon: "database", title: "Database Nutrisi Lengkap", desc: "Data kalori, karbohidrat, protein, lemak, dan gula dari Fatsecret." },
        { icon: "sparkles", title: "Rekomendasi AI", desc: "Gemini AI memberikan tips dan edukasi pola makan sehat." },
        { icon: "zap", title: "Dibangun dengan Roboflow", desc: "Mulai dari anotasi, training, hingga deployment model YOLOv8." }
    ];
    return React.createElement(
        "section",
        { className: "py-16" },
        React.createElement(
            "div",
            { className: "container mx-auto px-6" },
            React.createElement("h2", { className: "text-3xl font-bold text-gray-800 mb-10 text-center" }, "Fitur Utama Nutrify"),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" },
                features.map(function(feat, i) {
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
    );
}
