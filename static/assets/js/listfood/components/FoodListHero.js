function FoodListHero() {
    React.useEffect(() => { lucide.createIcons(); }, []);

    return React.createElement(
        "section",
        { className: "hero-bg min-h-[40vh] flex items-center relative overflow-hidden" },
        React.createElement("div", { className: "absolute inset-0 bg-black bg-opacity-20" }),
        React.createElement("div", { className: "container mx-auto px-6 py-16 relative z-10 text-center" }, // Adjusted padding to 16 for better spacing
            React.createElement("h1", { className: "text-4xl md:text-5xl font-bold mb-4 text-white" }, "Daftar Makanan"),
            React.createElement("p", { className: "text-lg text-gray-200 max-w-xl mx-auto mb-6" },
                "Jelajahi lebih dari 50 jenis makanan & minuman khas Indonesia yang dapat dideteksi otomatis. Temukan kategori, nama makanan, dan info gizi untuk hidup lebih sehat."
            ),
            React.createElement(
                "div", { className: "flex gap-3 justify-center mt-4 text-gray-300 text-sm" },
                React.createElement("span", { className: "inline-flex items-center gap-1 bg-green-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                    React.createElement("i", { "data-lucide": "bar-chart-3", className: "w-5 h-5 mr-2" }), "FatSecret (Info Nutrisi)"
                ),
                React.createElement("span", { className: "inline-flex items-center gap-1 bg-purple-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                    React.createElement("i", { "data-lucide": "zap", className: "w-5 h-5 mr-2" }), "Roboflow (Deteksi Makanan)"
                )
            )
        )
    );
}