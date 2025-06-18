// CalorieCalculatorHero.js
function CalorieCalculatorHero() {
  return React.createElement(
    "section",
    { className: "hero-bg min-h-[50vh] flex items-center relative overflow-hidden" },
    React.createElement("div", { className: "absolute inset-0 bg-black bg-opacity-20" }),
    React.createElement("div", { className: "container mx-auto px-6 py-16 relative z-10 text-center" },
      React.createElement("h1", { className: "text-5xl md:text-6xl font-bold mb-4 text-white" }, "Kalkulator Kalori"),
      React.createElement("p", { className: "text-xl text-gray-200 mb-4 max-w-2xl mx-auto" },
        "Hitung kebutuhan kalori harianmu berdasarkan data diri & aktivitas, dan dapatkan saran gizi dengan bantuan AI Gemini."
      ),
      React.createElement(
        "div",
        { className: "mt-6 flex flex-wrap gap-4 justify-center" },
        // Group 1 (Gemini AI, BMR, TDEE)
        React.createElement("div", { className: "flex flex-wrap gap-4 justify-center" },
          React.createElement("span", { className: "inline-flex items-center bg-yellow-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
            React.createElement("i", { "data-lucide": "activity", className: "w-5 h-5 mr-2" }),
            "BMR (Basal Metabolic Rate)"
          ),
          React.createElement("span", { className: "inline-flex items-center bg-orange-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
            React.createElement("i", { "data-lucide": "activity", className: "w-5 h-5 mr-2" }),
            "TDEE (Total Daily Energy Expenditure)"
          ),
          React.createElement("span", { className: "inline-flex items-center bg-blue-600 text-white rounded-full px-4 py-2 text-lg font-medium" },
            React.createElement("i", { "data-lucide": "sparkles", className: "w-5 h-5 mr-2" }), "Gemini AI (Nasihat Gizi)"
          )
        )
      )
    )
  );
}
