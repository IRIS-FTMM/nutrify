function FoodsListTeaser() {
    return React.createElement(
        "section",
        { className: "py-16" },
        React.createElement(
            "div",
            { className: "container mx-auto px-6 text-center max-w-2xl" },
            // Judul
            React.createElement("h2", { className: "text-3xl font-bold text-gray-800 mb-2" }, "Daftar Makanan"),
            // Deskripsi
            React.createElement("p", { className: "text-gray-600 mb-6" },
                "Jelajahi lebih dari 50 jenis makanan dan minuman khas Indonesia yang dapat dikenali secara otomatis berikut informasi gizi dan kalorinya."
            ),
            // Kategori
            React.createElement(
                "div",
                { className: "grid grid-cols-2 md:grid-cols-3 gap-4 text-base font-semibold mb-6" },
                [
                    { icon: "🍚", label: "Makanan Pokok" },      // nasi, mie, lontong, bihun
                    { icon: "🍗", label: "Lauk Pauk" },          // ayam, telur, ikan, sate, bakso, tempe, tahu, rendang, nugget, sosis, dsb
                    { icon: "🥦", label: "Sayur Mayur" },        // capcay, kangkung, kol, wortel, buncis, tauge, kacang panjang, lalapan, timun, tomat, selada
                    { icon: "🌶️", label: "Sambal & Pelengkap" },// sambal, kerupuk, serundeng, sambal kacang, sambal kentang
                    { icon: "🍩", label: "Camilan & Dessert" },  // donat, martabak, pisang, roti tawar, kentang goreng, perkedel
                    { icon: "🥤", label: "Minuman" }             // air putih, teh, kopi
                ].map(function(cat, i) {
                    return React.createElement(
                        "div",
                        { className: "flex items-center justify-center gap-2 py-2 bg-white rounded shadow-sm", key: i },
                        React.createElement("span", { className: "text-xl" }, cat.icon),
                        React.createElement("span", null, cat.label)
                    );
                })
            ),
            React.createElement("div", { className: "text-gray-500 mb-6 text-sm" },
                "Mulai dari nasi, lauk pauk, aneka sayur, minuman, camilan, hingga sambal dan pelengkap khas Nusantara."
            ),
            // Tombol
            React.createElement(
                "a",
                { href: "/foods-list", className: "inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors" },
                React.createElement("i", { "data-lucide": "arrow-right", className: "w-5 h-5 inline mr-2" }),
                "Lihat Daftar Makanan"
            )
        )
    );
}
