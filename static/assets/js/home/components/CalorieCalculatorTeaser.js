function CalorieCalculatorTeaser() {
    const inputs = [
        { icon: "user", label: "Usia" },
        { icon: "weight", label: "Berat Badan" },
        { icon: "ruler", label: "Tinggi Badan" },
        { icon: "venus-and-mars", label: "Jenis Kelamin" },
        { icon: "activity", label: "Aktivitas Harian" }
    ];
    
    const methods = [
        { icon: "calculator", label: "Basal Metabolic Rate (BMR)", desc: "Kalori dasar tubuh yang dibutuhkan saat istirahat." },
        { icon: "activity", label: "Total Daily Energy Expenditure (TDEE)", desc: "Total kalori harian yang terbakar, termasuk aktivitas fisik." }
    ];

    return React.createElement(
        "section",
        { className: "py-16 bg-gradient-to-br from-blue-50 to-indigo-50" },
        React.createElement(
            "div",
            { className: "container mx-auto px-6 max-w-4xl" },
            React.createElement(
                "div",
                { className: "text-center mb-12" },
                React.createElement("h2", { className: "text-3xl font-bold text-gray-800 mb-4" }, "Kalkulator Kalori"),
                React.createElement("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto" },
                    "Hitung kebutuhan kalori harianmu & dapatkan rekomendasi pola makan sehat dari AI"
                )
            ),

            // Input yang diperlukan
            React.createElement(
                "div",
                { className: "mb-10" },
                React.createElement("h3", { className: "text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2" },
                    React.createElement("i", { "data-lucide": "clipboard-list", className: "w-5 h-5 text-blue-600" }),
                    "Data yang Diperlukan"
                ),
                React.createElement(
                    "div",
                    { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" },
                    inputs.map((inp, i) =>
                        React.createElement(
                            "div",
                            { 
                                className: "flex flex-col items-center gap-2 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-blue-50 fade-in text-center",
                                key: i,
                                style: { animationDelay: `${i * 100}ms` }
                            },
                            React.createElement("div", { className: "w-10 h-10 flex items-center justify-center rounded-full bg-blue-100" },
                                React.createElement("i", { "data-lucide": inp.icon, className: "w-5 h-5 text-blue-600" })
                            ),
                            React.createElement("span", { className: "text-gray-700 font-medium" }, inp.label)
                        )
                    )
                )
            ),

            // Rumus/metode
            React.createElement(
                "div",
                { className: "mb-10" },
                React.createElement("h3", { className: "text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2" },
                    React.createElement("i", { "data-lucide": "brain", className: "w-5 h-5 text-green-600" }),
                    "Metode Saintifik"
                ),
                React.createElement(
                    "div",
                    { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                    methods.map((met, i) =>
                        React.createElement(
                            "div",
                            { 
                                className: "bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all border border-green-50 group fade-in",
                                key: i,
                                style: { animationDelay: `${i * 150 + 300}ms` }
                            },
                            React.createElement(
                                "div",
                                { className: "flex items-center gap-4" },
                                React.createElement("div", { className: "w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 group-hover:bg-green-200 transition-colors" },
                                    React.createElement("i", { "data-lucide": met.icon, className: "w-6 h-6 text-green-600" })
                                ),
                                React.createElement(
                                    "div",
                                    null,
                                    React.createElement("div", { className: "font-bold text-gray-800 text-lg mb-1" }, met.label),
                                    React.createElement("div", { className: "text-gray-600" }, met.desc)
                                )
                            )
                        )
                    )
                )
            ),

            // CTA Button
            React.createElement(
                "div",
                { className: "flex justify-center mt-6" },
                React.createElement(
                    "a",
                    {
                        href: "/calculate-calorie",
                        className: "inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-lg"
                    },
                    "Coba Kalkulator Sekarang",
                    React.createElement("i", { "data-lucide": "arrow-right", className: "w-5 h-5 ml-3" })
                )
            )
        )
    );
}