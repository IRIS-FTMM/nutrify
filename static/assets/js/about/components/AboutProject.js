function AboutProjectSection() {
    return React.createElement(
        "section",
        { className: "py-16 bg-white" },
        React.createElement("div", { className: "container mx-auto px-6 max-w-3xl" },
            React.createElement("h2", { className: "text-3xl font-bold text-blue-700 mb-6 text-center" }, "Apa itu Nutrify?"),
            React.createElement("p", { className: "text-gray-700 text-lg mb-6 text-justify" },
                "Nutrify adalah platform AI untuk deteksi otomatis makanan dan minuman khas Indonesia. Dengan model YOLOv8 berisi lebih dari 50 kelas, Nutrify menggunakan data anotasi Roboflow dan informasi nutrisi lengkap dari Fatsecret untuk menghadirkan pengalaman pelacakan gizi secara cepat dan akurat. Rekomendasi gizi dan pola makan sehat didukung Gemini AI."
            ),
            React.createElement(
                "div",
                { className: "flex justify-center" },
                React.createElement(
                  "ul",
                  { className: "space-y-2 mt-8 text-gray-700 text-left max-w-2xl mx-auto" },
                  [
                    React.createElement("li", { key: 1 },
                      React.createElement("i", { "data-lucide": "check-circle", className: "inline w-5 h-5 text-purple-500 mr-2" }),
                      "Deteksi otomatis makanan/minuman via kamera & upload."
                    ),
                    React.createElement("li", { key: 2 },
                      React.createElement("i", { "data-lucide": "check-circle", className: "inline w-5 h-5 text-purple-500 mr-2" }),
                      "Kalkulasi kebutuhan kalori harian & porsi (BMR, TDEE)."
                    ),
                    React.createElement("li", { key: 3 },
                      React.createElement("i", { "data-lucide": "check-circle", className: "inline w-5 h-5 text-purple-500 mr-2" }),
                      "Info nutrisi lengkap dari Fatsecret."
                    ),
                    React.createElement("li", { key: 4 },
                      React.createElement("i", { "data-lucide": "check-circle", className: "inline w-5 h-5 text-purple-500 mr-2" }),
                      "Tips sehat & edukasi gizi otomatis dari Gemini AI."
                    ),
                    React.createElement("li", { key: 5 },
                      React.createElement("i", { "data-lucide": "check-circle", className: "inline w-5 h-5 text-purple-500 mr-2" }),
                      "Model & anotasi dikembangkan dengan Roboflow."
                    ),
                  ]
                )
            )
        )
    );
}
