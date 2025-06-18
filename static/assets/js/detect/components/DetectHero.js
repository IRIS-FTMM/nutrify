// DetectHero.js
function DetectHero() {
    React.useEffect(() => {
        lucide.createIcons(); 
    }, []);

    return React.createElement(
        "section", 
        { className: "hero-bg min-h-[40vh] flex items-center relative overflow-hidden" },
        React.createElement("div", { className: "absolute inset-0 bg-black bg-opacity-20" }),
        React.createElement("div", { className: "container mx-auto px-6 py-16 relative z-10 text-center" },
            React.createElement("h1", { className: "text-4xl md:text-5xl font-bold mb-4 text-white" }, "Deteksi Makanan"),
            React.createElement("p", { className: "text-lg text-gray-200 max-w-xl mx-auto mb-6" },
                "Temukan nilai gizi makanan Anda hanya dengan memindai atau mengunggah gambar. Informasi akurat secara instan!"
            ),
            React.createElement(
                "div", 
                { className: "mt-6 flex flex-wrap gap-4 justify-center" },
                // Group 1 (YOLO, Roboflow) - First row
                React.createElement("span", { className: "inline-flex items-center gap-1 bg-red-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                    React.createElement("i", { "data-lucide": "camera", className: "w-5 h-5 mr-2" }),
                    "YOLO (Deteksi Gambar)"
                ),
                React.createElement("span", { className: "inline-flex items-center gap-1 bg-purple-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                    React.createElement("i", { "data-lucide": "zap", className: "w-5 h-5 mr-2" }),
                    "Roboflow (Model Training & Deployment)"
                )
            ),
            React.createElement(
                "div", 
                { className: "flex flex-wrap gap-4 justify-center mt-4" }, // Group 2 (FatSecret, Gemini AI) - Second row
                React.createElement("span", { className: "inline-flex items-center gap-1 bg-green-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                    React.createElement("i", { "data-lucide": "bar-chart-3", className: "w-5 h-5 mr-2" }),
                    "FatSecret (Info Nutrisi)"
                ),
                React.createElement("span", { className: "inline-flex items-center gap-1 bg-blue-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                    React.createElement("i", { "data-lucide": "sparkles", className: "w-5 h-5 mr-2" }),
                    "Gemini AI (Nasihat Gizi)"
                )
            )
        )
    );
}
