function FoodClassList() {
    // Data kelas makanan (dari data kamu, ini hanya contoh)
    const classes = [
        "air putih", "ayam asam manis", "ayam bakar", "ayam goreng", "ayam suwir",
        "bakso", "bihun", "capcay", "donat", "ikan bakar", "ikan goreng",
        "kacang panjang", "kari kentang", "kentang goreng", "kering tempe", "kerupuk", "kol",
        "kopi", "lalapan", "lontong", "martabak manis", "mie goreng", "nasi goreng",
        "nasi kuning", "nasi putih", "nugget goreng", "perkedel", "pisang", "rendang",
        "roti tawar", "sambal", "sambal kacang", "sambal kentang", "sate", "sayur buncis",
        "selada", "serundeng", "sosis", "tahu goreng", "tauge", "teh", "telur balado",
        "telur ceplok", "telur dadar", "telur rebus", "tempe goreng", "timun", "tomat",
        "tumis kangkung", "wortel"
    ];

    return React.createElement(
        "section",
        { id: "food-list", className: "py-16 bg-blue-50" },
        React.createElement(
            "div",
            { className: "container mx-auto px-6" },
            React.createElement("h2", { className: "text-2xl font-bold text-blue-700 mb-8 text-center" }, "Daftar Lengkap Makanan & Minuman"),
            React.createElement(
                "div",
                { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" },
                classes.sort().map((name, idx) =>
                    React.createElement("div", {
                        key: idx,
                        className: "bg-white rounded-lg shadow p-4 flex flex-col items-center text-center hover:shadow-lg transition group"
                    },
                        React.createElement("div", {
                            className: "w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2 group-hover:bg-blue-200"
                        },
                            React.createElement("i", { "data-lucide": "check-circle", className: "w-5 h-5 text-blue-500" })
                        ),
                        React.createElement("div", { className: "font-medium text-gray-800 text-sm truncate" }, name.charAt(0).toUpperCase() + name.slice(1))
                    )
                )
            )
        )
    );
}
