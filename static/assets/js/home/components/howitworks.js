function HowItWorksSection() {
    return React.createElement(
        "section",
        { id: "how-it-works", className: "py-10 bg-gray-50" },
        React.createElement(
            "div",
            { className: "container mx-auto px-6 max-w-6xl" }, // Perbesar max-width container
            React.createElement(
                "div",
                { className: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center" }, // Grid 2 kolom
                
                // Kolom Kiri: Gambar
                React.createElement(
                    "div",
                    { 
                        className: "h-80 md:h-96 rounded-xl overflow-hidden shadow-lg",
                        style: {
                            backgroundImage: "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }
                    }
                ),
                
                // Kolom Kanan: Konten
                React.createElement(
                    "div",
                    null,
                    React.createElement("h3", { className: "text-2xl font-bold text-gray-800 mb-6" }, "Cara Kerja"),
                    React.createElement(
                        "div",
                        { className: "grid grid-cols-1 gap-6" },
                        [
                            { icon: "camera", title: "1. Ambil Foto", desc: "Foto makanan lewat kamera atau upload gambar." },
                            { icon: "cpu", title: "2. Deteksi Otomatis", desc: "YOLO mengenali makanan & porsinya." },
                            { icon: "search", title: "3. Analisis Nutrisi", desc: "Tampilkan kalori, karbohidrat, protein, lemak, dan gula." },
                            { icon: "sparkles", title: "4. Dapatkan Rekomendasi oleh Gemini AI", desc: "Gemini AI memberikan saran makan sehat & edukasi gizi yang personal." }
                        ].map(function (step, i) {
                            return React.createElement(
                                "div",
                                { 
                                    className: "flex items-start gap-3 bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all fade-in",
                                    key: i,
                                    style: { animationDelay: `${i * 100}ms` } // Animasi berurutan
                                },
                                React.createElement(
                                    "div",
                                    { className: "w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 mr-2" },
                                    React.createElement("i", { "data-lucide": step.icon, className: "w-6 h-6 text-blue-600" })
                                ),
                                React.createElement(
                                    "div",
                                    null,
                                    React.createElement("div", { className: "font-semibold text-gray-800" }, step.title),
                                    React.createElement("div", { className: "text-gray-600 text-sm" }, step.desc)
                                )
                            );
                        })
                    )
                )
            )
        )
    );
}