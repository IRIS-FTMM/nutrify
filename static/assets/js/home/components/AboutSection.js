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
                { className: "text-3xl font-bold text-gray-800 mb-6 text-center" },  // Adjusted size
                "Tentang Nutrify"
            ),
            React.createElement(
                "p",
                { className: "text-lg text-gray-600 mb-4 text-center" },  // Consistent text size
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
                    React.createElement("div", { className: "text-3xl font-bold text-blue-600 mb-2" }, "YOLOv12"),
                    React.createElement("div", { className: "text-gray-600" }, "Model Deteksi Makanan")
                ),
                React.createElement(
                    "div",
                    { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-blue-600 mb-2" }, "85.1%"),
                    React.createElement("div", { className: "text-gray-600" }, "Akurasi Model (mAP@50)")
                )
            )
        )
    );
}