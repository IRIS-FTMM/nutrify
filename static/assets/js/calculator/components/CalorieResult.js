function CalorieResult({ hasil, tips, loading, resultRef }) {
    React.useEffect(() => {
        if (window.lucide) {
            lucide.createIcons();
        }
    });

    if (!hasil) {
        return null;
    }

    const resultData = [
        { label: "BMR (Kalori Dasar)", value: hasil.bmr, icon: "activity" },
        { label: "TDEE (Kebutuhan Total)", value: hasil.tdee, icon: "bar-chart-2" },
        { label: hasil.goalTitle, value: hasil.goalCalories, icon: "target" }
    ];

    return React.createElement(
        "div",
        { id: "calorie-result", ref: resultRef, className: "mt-10 bg-white rounded-xl shadow-lg p-8 fade-in" },
        React.createElement("h3", { className: "text-2xl font-bold text-blue-700 mb-6 text-center" }, "Hasil Perhitungan Kalori"),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" },
            resultData.map((d, idx) =>
                React.createElement( "div", { key: idx, className: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100 text-center shadow-sm" },
                    React.createElement("div", { className: "w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-3" }, React.createElement("i", { "data-lucide": d.icon, className: "w-6 h-6 text-blue-600" })),
                    React.createElement("div", { className: "text-lg font-semibold text-blue-800 mb-1" }, d.label),
                    React.createElement("div", { className: "text-3xl font-bold text-gray-800" }, d.value),
                    React.createElement("div", { className: "text-sm text-gray-600" }, "Kalori")
                )
            )
        ),
        React.createElement("div", { className: "mt-8" },
            React.createElement("h4", { className: "text-xl font-bold text-purple-700 mb-4 flex items-center justify-center" },
                React.createElement("i", { "data-lucide": "sparkles", className: "w-6 h-6 mr-2 text-purple-500" }),
                "Tips Sehat dari AI Gemini"
            ),
            loading ?
                React.createElement("div", { className: "text-center py-6" },
                    React.createElement("div", {className: "space-y-2"},
                        React.createElement("div", {className: "h-3 bg-gray-200 rounded-full w-5/6 mx-auto animate-pulse"}),
                        React.createElement("div", {className: "h-3 bg-gray-200 rounded-full w-4/6 mx-auto animate-pulse"}),
                        React.createElement("div", {className: "h-3 bg-gray-200 rounded-full w-5/6 mx-auto animate-pulse"})
                    )
                )
                :
                tips.length > 0 ?
                    React.createElement("div", { className: "bg-purple-50 rounded-xl p-6" },
                        React.createElement("ul", { className: "space-y-4" },
                            tips.map((tip, i) =>
                                React.createElement("li", { key: i, className: "flex items-start bg-white p-4 rounded-lg shadow-sm border border-purple-100" },
                                    React.createElement("i", { "data-lucide": "check-circle", className: "w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" }),
                                    React.createElement("span", { className: "text-gray-700" }, tip)
                                )
                            )
                        )
                    )
                    :
                    React.createElement("div", { className: "text-center py-6 text-gray-600" }, "Tidak ada tips yang tersedia")
        )
    );
}