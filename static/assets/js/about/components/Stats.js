function StatsSection() {
    return React.createElement(
        "section",
        { className: "py-8" },
        React.createElement(
            "div",
            { className: "container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center" },
            [
                { value: "50+", label: "Kelas Makanan", icon: "list" },
                { value: "2.000+", label: "Gambar Dataset", icon: "image" },
                { value: "2025", label: "Tahun Model", icon: "calendar" },
                { value: "85.1%", label: "mAP@50 (Akurasi)", icon: "target" },
                { value: "75.7%", label: "Precision", icon: "check" },
                { value: "77.7%", label: "Recall", icon: "repeat" }
            ].map(function(s, i) {
                return React.createElement("div", { key: i, className: "bg-white p-8 rounded-lg shadow fade-in" },
                    React.createElement("i", { "data-lucide": s.icon, className: "w-8 h-8 text-blue-600 mb-2" }),
                    React.createElement("div", { className: "text-3xl font-bold text-blue-700" }, s.value),
                    React.createElement("div", { className: "text-gray-600" }, s.label)
                );
            })
        )
    );
}
