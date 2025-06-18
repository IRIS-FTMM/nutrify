function CalorieCalculatorTeaser() {
    // Data input yang dibutuhkan dan rumus
    const inputs = [
        { icon: "user", label: "Usia" },
        { icon: "weight", label: "Berat Badan" },
        { icon: "ruler", label: "Tinggi Badan" },
        { icon: "venus", label: "Jenis Kelamin" },
        { icon: "activity", label: "Aktivitas Harian" }
    ];
    const methods = [
        { icon: "calculator", label: "BMR (Basal Metabolic Rate)", desc: "Perhitungan kebutuhan kalori dasar tubuh." },
        { icon: "activity", label: "TDEE (Total Daily Energy Expenditure)", desc: "Estimasi total kalori berdasarkan aktivitas." }
    ];

    return React.createElement(
        "section",
        { className: "py-16 bg-blue-50" },
        React.createElement(
            "div",
            { className: "container mx-auto px-6 max-w-3xl" },
            React.createElement("h2", { className: "text-3xl font-bold text-gray-800 mb-4 text-center" }, "Kalkulator Kalori"),
            React.createElement("p", { className: "text-lg text-gray-600 mb-8 text-center" },
                "Hitung kebutuhan kalori harianmu secara otomatis berdasarkan data diri dan aktivitas. Dapatkan tips sehat & rekomendasi pola makan langsung dari AI."
            ),

            // Input yang diperlukan
            React.createElement(
                "div",
                { className: "mb-8" },
                React.createElement("h3", { className: "text-xl font-semibold text-gray-800 mb-2 text-center" }, "Data yang Perlu Diisi"),
                React.createElement(
                    "div",
                    { className: "flex flex-wrap gap-4 justify-center" },
                    inputs.map((inp, i) =>
                        React.createElement(
                            "div",
                            { className: "flex flex-col items-center bg-white rounded-lg px-4 py-3 shadow w-32", key: i },
                            React.createElement("i", { "data-lucide": inp.icon, className: "w-7 h-7 text-blue-600 mb-1" }),
                            React.createElement("span", { className: "text-gray-700 text-sm" }, inp.label)
                        )
                    )
                )
            ),

            // Rumus/metode
            React.createElement(
                "div",
                { className: "mb-8" },
                React.createElement("h3", { className: "text-xl font-semibold text-gray-800 mb-2 text-center" }, "Metode Perhitungan"),
                React.createElement(
                    "div",
                    { className: "flex flex-col md:flex-row gap-4 justify-center items-stretch" },
                    methods.map((met, i) =>
                        React.createElement(
                            "div",
                            { className: "flex-1 bg-white rounded-lg px-4 py-4 shadow flex items-center gap-3", key: i },
                            React.createElement("i", { "data-lucide": met.icon, className: "w-7 h-7 text-green-600" }),
                            React.createElement(
                                "div",
                                null,
                                React.createElement("div", { className: "font-semibold text-gray-800 text-sm mb-1" }, met.label),
                                React.createElement("div", { className: "text-gray-600 text-xs" }, met.desc)
                            )
                        )
                    )
                )
            ),

            // CTA Button
            React.createElement(
                "div",
                { className: "flex justify-center mt-8" },
                React.createElement(
                    "a",
                    {
                        href: "/calculate-calorie",
                        className: "inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
                    },
                    React.createElement("i", { "data-lucide": "arrow-right", className: "w-5 h-5 inline mr-2" }),
                    "Coba Kalkulator Kalori"
                )
            )
        )
    );
}
