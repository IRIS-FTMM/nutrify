// ResultsSection.js
function ResultsSection() {
    return React.createElement(
        "section", 
        // Style dengan Tailwind, awalnya disembunyikan
        { className: "results-section hidden mt-12", id: "results-section" },
        React.createElement(
            "div", 
            { className: "flex justify-between items-center mb-6" },
            React.createElement("h2", { className: "text-3xl font-bold text-gray-800" }, "Analisis Nutrisi"),
            React.createElement("button", { className: "btn bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center", id: "new-scan-btn" },
                React.createElement("i", { "data-lucide": "scan-line", className: "w-5 h-5 mr-2" }), 
                "Pindai Baru"
            )
        ),
        React.createElement(
            "div", 
            { className: "grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-lg" },
            React.createElement("div", { className: "food-image" },
                // Ganti URL placeholder yang lebih andal
                React.createElement("img", { src: "https://placehold.co/400x400?text=Hasil+Pindaian", alt: "Makanan yang dipindai", id: "result-image", className: "rounded-lg w-full h-auto object-cover" })
            ),
            React.createElement("div", { className: "food-info" },
                React.createElement("h3", { className: "food-name text-2xl font-bold text-gray-900", id: "food-name" }, "-"),
                React.createElement("p", { className: "food-description text-gray-600 mt-2", id: "food-description" }, "-"),
                React.createElement(
                    "div", 
                    { className: "nutrition-facts mt-6" },
                    React.createElement("div", { className: "border-t-2 border-b-2 border-gray-200 py-2" },
                        React.createElement("span", { className: "text-xl font-semibold text-gray-800" }, "Fakta Nutrisi")
                    ),
                    React.createElement(
                        "table", 
                        { className: "nutrition-table w-full mt-4 text-gray-700" },
                        // === PERBAIKAN: Menambahkan <tbody> ===
                        React.createElement("tbody", null, 
                            React.createElement("tr", { className: "border-b" },
                                React.createElement("td", { className: "py-2" }, "Kalori"),
                                React.createElement("td", { className: "font-bold text-right", id: "calories" }, "-")
                            ),
                            React.createElement("tr", { className: "border-b" },
                                React.createElement("td", { className: "py-2" }, "Protein"),
                                React.createElement("td", { className: "text-right", id: "protein" }, "-")
                            ),
                            React.createElement("tr", { className: "border-b" },
                                React.createElement("td", { className: "py-2" }, "Karbohidrat"),
                                React.createElement("td", { className: "text-right", id: "carbs" }, "-")
                            ),
                            React.createElement("tr", { className: "border-b" },
                                React.createElement("td", { className: "py-2" }, "Lemak"),
                                React.createElement("td", { className: "text-right", id: "fats" }, "-")
                            ),
                            React.createElement("tr", { className: "border-b" },
                                React.createElement("td", { className: "py-2" }, "Ukuran Saji (gram)"),
                                React.createElement("td", { className: "text-right" },
                                    React.createElement("input", {
                                        id: "serving-input",
                                        type: "number",
                                        min: "1",
                                        max: "9999",
                                        // === PERBAIKAN: value -> defaultValue ===
                                        defaultValue: "100",
                                        className: "w-20 text-right p-1 border rounded"
                                    }),
                                )
                            ),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "py-2" }, "Info Lebih Lanjut"),
                                React.createElement("td", { className: "text-right" },
                                    React.createElement("a", { id: "food-details-link", href: "#", target: "_blank", className: "text-blue-600 hover:underline" }, "Klik di sini")
                                )
                            )
                        )
                    )
                )
            ),
        ),
        React.createElement(
            "div", 
            { className: "tips-section mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg", id: "tips-section" },
            React.createElement("h3", { className: "text-xl font-semibold text-blue-800 flex items-center" },
                React.createElement("i", { "data-lucide": "lightbulb", className: "w-6 h-6 mr-3" }),
                "Tips Makan Sehat"
            ),
            React.createElement(
                "ul", 
                { className: "tips-list list-disc list-inside mt-4 space-y-2 text-blue-700" },
                React.createElement("li", null, "Sajian ini memberikan keseimbangan protein dan sayuran yang baik. Pertimbangkan menambahkan lebih banyak sayuran hijau untuk serat ekstra."),
                React.createElement("li", null, "Untuk pilihan rendah kalori, Anda bisa menggunakan saus yang lebih ringan atau mengurangi porsi sebesar 20%."),
                React.createElement("li", null, "Pasangkan dengan buah untuk hidangan yang lebih lengkap dengan tambahan vitamin.")
            )
        )
    );
}