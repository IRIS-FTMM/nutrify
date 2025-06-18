function AboutSection() {
    return React.createElement(
        "section",
        { id: "about", className: "py-10 bg-gray-50" },
        React.createElement(
            "div",
            { className: "container mx-auto px-6 max-w-4xl" },

            // Judul & Deskripsi
            React.createElement(
                "h2",
                { className: "text-4xl font-bold text-gray-800 mb-6 text-center" },
                "Tentang Nutrify"
            ),
            React.createElement(
                "p",
                { className: "text-lg text-gray-600 mb-4 text-center" },
                "Nutrify adalah sistem deteksi makanan berbasis YOLO yang memudahkan pelacakan gizi, menghitung kalori makanan secara otomatis, dan membantu edukasi pola makan sehat."
            ),

            // Credit Section
            React.createElement(
                "div",
                { className: "flex gap-3 justify-center mt-2 mb-10 text-gray-500 text-sm fade-in" },
                React.createElement("span", { className: "flex items-center gap-1" },
                    React.createElement("i", { "data-lucide": "zap", className: "w-4 h-4 text-yellow-400" }),
                    "Roboflow (Annotasi, Training, Deploy)"
                ),
                React.createElement("span", { className: "flex items-center gap-1" },
                    React.createElement("i", { "data-lucide": "bar-chart-3", className: "w-4 h-4 text-green-500" }),
                    "Fatsecret (Info Nutrisi)"
                ),
                React.createElement("span", { className: "flex items-center gap-1" },
                    React.createElement("i", { "data-lucide": "sparkles", className: "w-4 h-4 text-purple-400" }),
                    "Gemini AI"
                )
            ),

            // Statistik Model
            React.createElement(
                "div",
                { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" },
                React.createElement(
                    "div",
                    { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-blue-600 mb-2" }, "50+"),
                    React.createElement("div", { className: "text-gray-600" }, "Kelas Makanan Terdeteksi")
                ),
                React.createElement(
                    "div",
                    { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-blue-600 mb-2" }, "YOLO"),
                    React.createElement("div", { className: "text-gray-600" }, "Model Deteksi Makanan")
                ),
                React.createElement(
                    "div",
                    { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-blue-600 mb-2" }, "81.4%"),
                    React.createElement("div", { className: "text-gray-600" }, "Akurasi Model (mAP@50)")
                )
            ),

            // // Fitur Utama (ganti sesuai permintaan)
            // React.createElement(
            //     "div",
            //     { className: "mb-12" },
            //     React.createElement(
            //         "h3",
            //         { className: "text-2xl font-bold text-gray-800 mb-6 text-center" },
            //         "Fitur Utama Nutrify"
            //     ),
            //     React.createElement(
            //         "div",
            //         { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" },
            //         [
            //             { icon: "camera", title: "Deteksi dengan Kamera", desc: "Mengenali makanan dan minuman langsung dari kamera maupun galeri." },
            //             { icon: "image", title: "Deteksi dengan Gambar", desc: "Data kalori, karbohidrat, protein, lemak, dan gula dari Fatsecret." },
            //             { icon: "activity", title: "Kalkulator Kalori", desc: "Hitung kebutuhan kalori harian dengan"},
            //             { icon: "sparkles", title: "Rekomendasi AI", desc: "Gemini AI memberi tips makan sehat & edukasi gizi langsung dari AI terbaru/" }
            //         ].map(function (feat, i) {
            //             return React.createElement(
            //                 "div",
            //                 { className: "bg-white rounded-lg shadow p-8 flex flex-col items-center text-center fade-in", key: i },
            //                 React.createElement("div", { className: "w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full mb-4" },
            //                     React.createElement("i", { "data-lucide": feat.icon, className: "w-7 h-7 text-blue-600" })
            //                 ),
            //                 React.createElement("h3", { className: "font-semibold text-lg text-gray-800 mb-2" }, feat.title),
            //                 React.createElement("p", { className: "text-gray-600 text-sm" }, feat.desc)
            //             );
            //         })
            //     )
            // ),

            // // Cara Kerja
            // React.createElement(
            //     "div",
            //     null,
            //     React.createElement("h3", { className: "text-2xl font-bold text-gray-800 mb-6 text-center" }, "Cara Kerja"),
            //     React.createElement(
            //         "div",
            //         { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" },
            //         [
            //             { icon: "camera", title: "1. Ambil Foto", desc: "Foto makanan lewat kamera atau upload gambar." },
            //             { icon: "cpu", title: "2. Deteksi Otomatis", desc: "YOLO mengenali makanan & porsinya." },
            //             { icon: "search", title: "3. Analisis Nutrisi", desc: "Tampilkan kalori, karbohidrat, protein, lemak, dan gula." },
            //             { icon: "sparkles", title: "4. Dapatkan Rekomendasi oleh Gemini AI", desc: "Gemini AI memberikan saran makan sehat & edukasi gizi yang personal." }
            //         ].map(function (step, i) {
            //             return React.createElement(
            //                 "div",
            //                 { className: "flex items-start gap-3 bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all", key: i },
            //                 React.createElement(
            //                     "div",
            //                     { className: "w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 mr-2" },
            //                     React.createElement("i", { "data-lucide": step.icon, className: "w-6 h-6 text-blue-600" })
            //                 ),
            //                 React.createElement(
            //                     "div",
            //                     null,
            //                     React.createElement("div", { className: "font-semibold text-gray-800" }, step.title),
            //                     React.createElement("div", { className: "text-gray-600 text-sm" }, step.desc)
            //                 )
            //             );
            //         })
            //     )
            // ),

            // Tombol Selengkapnya
            React.createElement(
                "div",
                { className: "mt-8 flex justify-center" },
                React.createElement(
                    "a",
                    {
                        href: "/about",
                        className: "inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    },
                    React.createElement("i", { "data-lucide": "arrow-right", className: "w-5 h-5 inline mr-2" }),
                    "Selengkapnya"
                )
            )
        )
    );
}
