function CreditSection() {
    return React.createElement(
        "section", { className: "py-8 bg-blue-50" },
        React.createElement("div", { className: "container mx-auto px-6 text-center" },
            React.createElement("h3", { className: "text-xl font-bold text-blue-700 mb-4" }, "Kredit & Dukungan Teknologi"),
            React.createElement("div", { className: "flex flex-wrap gap-3 justify-center items-center text-gray-700 text-base" }, [
                React.createElement("span", { className: "inline-flex items-center gap-1" },
                    React.createElement("i", { "data-lucide": "zap", className: "w-5 h-5 text-yellow-400" }),
                    "Model YOLO dikembangkan & dianotasi dengan ",
                    React.createElement("a", { href: "https://roboflow.com/", className: "underline text-blue-600", target: "_blank", rel: "noopener" }, "Roboflow")
                ),
                React.createElement("span", { className: "inline-flex items-center gap-1" },
                    React.createElement("i", { "data-lucide": "bar-chart-3", className: "w-5 h-5 text-green-600" }),
                    "Info nutrisi makanan dari ",
                    React.createElement("a", { href: "https://fatsecret.com/", className: "underline text-blue-600", target: "_blank", rel: "noopener" }, "FatSecret")
                ),
                React.createElement("span", { className: "inline-flex items-center gap-1" },
                    React.createElement("i", { "data-lucide": "sparkles", className: "w-5 h-5 text-purple-500" }),
                    "AI Advisor powered by ",
                    React.createElement("a", { href: "https://openrouter.ai/", className: "underline text-blue-600", target: "_blank", rel: "noopener" }, "Gemini 2.0 Flash (OpenRouter)")
                )
            ])
        )
    );
}
