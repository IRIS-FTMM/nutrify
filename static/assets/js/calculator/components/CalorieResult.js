function CalorieResult({ hasil, tips, resultRef }) {
    // Node SELALU ADA, isinya conditional
    return React.createElement(
        "div", { id: "calorie-result", ref: resultRef, className: "mt-10 bg-white rounded-xl shadow-lg p-8 fade-in" },
        !hasil ? null : [
            React.createElement("h3", { className: "text-2xl font-bold text-blue-700 mb-3", key: "judul" }, "Hasil Perhitungan Kalori"),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4", key: "grid" },
                [
                    { label: "BMR (Kalori Dasar)", value: hasil.bmr },
                    { label: "TDEE (Kebutuhan Total)", value: hasil.tdee },
                    { label: hasil.goalTitle, value: hasil.goalCalories, desc: hasil.goalDesc }
                ].map((d, idx) => React.createElement("div", { key: idx, className: "bg-blue-50 rounded-lg p-4 text-center" },
                    React.createElement("div", { className: "text-lg font-semibold text-blue-700" }, d.label),
                    React.createElement("div", { className: "text-2xl font-bold mb-1" }, d.value),
                    d.desc && React.createElement("div", { className: "text-sm text-gray-600" }, d.desc)
                ))
            ),
            React.createElement("div", { className: "mt-8", key: "tips" },
                React.createElement("h4", { className: "text-lg font-bold text-purple-700 mb-2" },
                    React.createElement("i", { "data-lucide": "sparkles", className: "w-5 h-5 inline mr-2" }),
                    "Tips Sehat dari AI Gemini"
                ),
                React.createElement("ul", { className: "list-disc pl-6 space-y-1 text-gray-700" },
                    tips.length > 0
                        ? tips.map((tip, i) =>
                            React.createElement("li", { key: i }, tip.replace(/\*\*(.*?)\*\*/g, '$1'))
                        )
                        : React.createElement("li", null, "Tips sedang diambil...")
                )
            )
        ]
    );
}
