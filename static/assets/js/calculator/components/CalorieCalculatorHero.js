function CalorieCalculatorHero() {
    return React.createElement(
      "section",
      { className: "hero-bg min-h-[35vh] flex items-center relative overflow-hidden" },
      React.createElement("div", { className: "absolute inset-0 bg-black bg-opacity-20" }),
      React.createElement("div", { className: "container mx-auto px-6 py-12 relative z-10 text-center" },
        React.createElement("h1", { className: "text-4xl md:text-5xl font-bold mb-4 text-white" }, "Kalkulator Kalori"),
        React.createElement("p", { className: "text-lg text-gray-200 max-w-xl mx-auto" }, 
          "Hitung kebutuhan kalori harianmu secara otomatis berdasarkan data diri & aktivitas. Dapatkan tips sehat dan saran makan dari AI Gemini."
        ),
        React.createElement(
          "div", { className: "flex gap-3 justify-center mt-4 text-gray-300 text-sm" },
          React.createElement("span", { className: "flex items-center gap-1" }, 
            React.createElement("i", { "data-lucide": "activity", className: "w-4 h-4 text-yellow-400" }), "BMR/TDEE"
          ),
          React.createElement("span", { className: "flex items-center gap-1" }, 
            React.createElement("i", { "data-lucide": "sparkles", className: "w-4 h-4 text-purple-400" }), "Gemini AI"
          )
        )
      )
    );
  }
  