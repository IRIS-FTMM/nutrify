function Hero() {
    try {
        React.useEffect(() => { lucide.createIcons(); }, []);

        return React.createElement(
            "section",
            { "data-name": "hero", "data-file": "components/Hero.js", className: "hero-bg min-h-screen flex items-center relative overflow-hidden" },
            React.createElement("div", { className: "absolute inset-0 bg-black bg-opacity-20" }),
            React.createElement(
                "div",
                { className: "container mx-auto px-6 py-20 relative z-10" },
                React.createElement(
                    "div",
                    { className: "grid md:grid-cols-2 gap-12 items-center" },
                    // Kiri
                    React.createElement(
                        "div",
                        { className: "text-white fade-in" },
                        React.createElement("h1", { className: "text-5xl md:text-6xl font-bold mb-6 leading-tight" }, [
                            "Nutrify",
                            React.createElement("span", {
                                className: "block text-yellow-300 text-3xl md:text-4xl font-semibold mt-1",
                                key: "n"
                            }, "Nutrition Identify")
                        ]),
                        React.createElement("p", { className: "text-xl mb-8 text-gray-200" },
                            "Sistem deteksi makanan otomatis berbasis ",
                            React.createElement("b", null, "YOLO"),
                            " untuk analisis nutrisi, estimasi kalori, dan rekomendasi pola makan sehat."
                        ),
                        React.createElement(
                            "div",
                            { className: "flex flex-col sm:flex-row gap-4" },
                            React.createElement("button", {
                                onClick: function () { window.location.href = '/detect'; },
                                className: "bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
                            }, [
                                React.createElement("i", { "data-lucide": "play", className: "w-5 h-5 inline mr-2", key: "icon" }),
                                "Coba Deteksi"
                            ])
                        )
                    ),
                    // Kanan
                    React.createElement(
                        "div",
                        { className: "slide-right" },
                        React.createElement(
                            "div",
                            { className: "relative" },
                            React.createElement("img", {
                                src: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                                alt: "Teknologi Deteksi Makanan",
                                className: "rounded-lg shadow-2xl floating"
                            }),
                            React.createElement(
                                "div",
                                { className: "absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg" },
                                React.createElement(
                                    "div",
                                    { className: "flex items-center space-x-2" },
                                    React.createElement("i", { "data-lucide": "zap", className: "w-6 h-6 text-green-500" }),
                                    React.createElement("span", { className: "text-gray-800 font-semibold" }, "Berbasis YOLO")
                                )
                            )
                        )
                    )
                )
            )
        );
    } catch (error) {
        console.error('Hero component error:', error);
        reportError(error);
    }
}
