const foodCategories = [
    {
      name: "Makanan Pokok",
      emoji: "🍚",
      description: "Nasi, mie, lontong dan olahan utama sebagai sumber karbohidrat.",
      classes: [
        "nasi putih", "nasi kuning", "nasi goreng", "bihun", "mie goreng", "lontong"
      ],
    },
    {
      name: "Lauk Pauk",
      emoji: "🍗",
      description: "Aneka lauk protein hewani & nabati.",
      classes: [
        "ayam bakar", "ayam goreng", "ayam asam manis", "ayam suwir", "nugget goreng", "bakso",
        "sosis", "telur balado", "telur ceplok", "telur dadar", "telur rebus", "tahu goreng",
        "tempe goreng", "rendang", "sate", "ikan bakar", "ikan goreng", "kering tempe",
        "perkedel", "kari kentang", "daging"
      ],
    },
    {
      name: "Sayur Mayur",
      emoji: "🥦",
      description: "Aneka sayuran segar dan masakan sayur.",
      classes: [
        "capcay", "kacang panjang", "kol", "lalapan", "sayur buncis", "selada", "tauge",
        "timun", "tomat", "tumis kangkung", "wortel"
      ],
    },
    {
      name: "Sambal & Pelengkap",
      emoji: "🌶️",
      description: "Sambal dan pelengkap makanan khas Nusantara.",
      classes: [
        "sambal", "sambal kacang", "sambal kentang", "kerupuk", "serundeng"
      ],
    },
    {
      name: "Camilan & Dessert",
      emoji: "🍩",
      description: "Aneka camilan dan makanan penutup.",
      classes: [
        "donat", "martabak manis", "pisang", "roti tawar"
      ],
    },
    {
      name: "Minuman",
      emoji: "🥤",
      description: "Minuman tradisional dan modern.",
      classes: [
        "air putih", "teh", "kopi"
      ],
    },
  ];
  
  function FoodCategories() {
      return React.createElement(
          "section", { className: "py-16 bg-white" },
          React.createElement("div", { className: "container mx-auto px-6" },
              React.createElement("h2", { className: "text-3xl font-bold text-blue-700 mb-10 text-center" }, "Kategori Makanan"),
              React.createElement(
                  "div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8" },
                  foodCategories.map((cat, i) =>
                      React.createElement(
                          "div",
                          { key: i, className: "flex gap-4 items-start p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition" },
                          React.createElement("span", { className: "text-4xl mt-2" }, cat.emoji),
                          React.createElement("div", {},
                              React.createElement("h3", { className: "text-xl font-bold text-blue-700 mb-1" }, cat.name),
                              React.createElement("p", { className: "text-gray-700 text-sm mb-2" }, cat.description),
                              React.createElement(
                                  "div", { className: "flex flex-wrap gap-2 text-xs text-gray-600 mb-2" },
                                  cat.classes.map((cl, idx) =>
                                      React.createElement("span", { key: idx, className: "bg-blue-100 text-blue-600 px-2 py-1 rounded-full" }, cl)
                                  )
                              ),
                              // Bisa tambahkan tombol/tautan "Lihat semua makanan" jika mau routing ke list per kategori
                          )
                      )
                  )
              )
          )
      );
  }
  