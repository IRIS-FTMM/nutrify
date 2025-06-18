// AboutHero.js
function AboutHero() {
    return React.createElement(
        "section",
        { className: "hero-bg min-h-[50vh] flex items-center relative overflow-hidden" },
        React.createElement("div", { className: "absolute inset-0 bg-black bg-opacity-20" }),
        React.createElement("div", { className: "container mx-auto px-6 py-16 relative z-10 text-center" },
            React.createElement("h1", { className: "text-5xl md:text-6xl font-bold mb-4 text-white" }, "Tentang Nutrify"),
            React.createElement("p", { className: "text-xl text-gray-200 mb-2 max-w-2xl mx-auto" },
                "Nutrify adalah solusi deteksi makanan berbasis AI dan YOLO, dengan data, anotasi, serta integrasi informasi nutrisi yang dirancang khusus untuk makanan Indonesia."
            ),
            React.createElement(
                "div",
                { className: "mt-6 flex flex-wrap gap-4 justify-center" },
                // Group 1 (YOLO, Roboflow, Gemini AI)
                React.createElement("div", { className: "flex flex-wrap gap-4 justify-center" },
                    React.createElement("span", { className: "inline-flex items-center gap-1 bg-red-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                        React.createElement("i", { "data-lucide": "camera", className: "w-5 h-5 mr-2" }),
                        "YOLO (Deteksi Gambar)"
                    ),
                    React.createElement("span", { className: "inline-flex items-center gap-1 bg-purple-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                        React.createElement("i", { "data-lucide": "zap", className: "w-5 h-5 mr-2" }),
                        "Roboflow (Model Training & Deployment)"
                    ),
                    React.createElement("span", { className: "inline-flex items-center gap-1 bg-blue-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                        React.createElement("i", { "data-lucide": "sparkles", className: "w-5 h-5 mr-2" }),
                        "Gemini AI (Nasihat Gizi)"
                    )
                ),
                // Group 2 (FatSecret, BMR, TDEE)
                React.createElement("div", { className: "flex flex-wrap gap-4 justify-center mt-4" },
                    React.createElement("span", { className: "inline-flex items-center gap-1 bg-green-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                        React.createElement("i", { "data-lucide": "bar-chart-3", className: "w-5 h-5 mr-2" }),
                        "FatSecret (Info Nutrisi)"
                    ),
                    React.createElement("span", { className: "inline-flex items-center gap-1 bg-yellow-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                        React.createElement("i", { "data-lucide": "activity", className: "w-5 h-5 mr-2" }),
                        "Basal Metabolic Rate (BMR)"
                    ),
                    React.createElement("span", { className: "inline-flex items-center gap-1 bg-orange-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
                        React.createElement("i", { "data-lucide": "activity", className: "w-5 h-5 mr-2" }),
                        "Total Daily Energy Expenditure (TDEE)"
                    )
                )
            )
        )
    );
}
