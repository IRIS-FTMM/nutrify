function HowItWorks() {
    var steps = [
        { icon: "camera", title: "Ambil Foto", desc: "Foto makanan atau upload gambar." },
        { icon: "cpu", title: "Deteksi Otomatis", desc: "Model YOLOv8 mengenali makanan & takaran via Roboflow API." },
        { icon: "bar-chart-3", title: "Cek Info Nutrisi", desc: "Otomatis ambil data kalori dan nutrisi dari Fatsecret API." },
        { icon: "sparkles", title: "Dapatkan Saran AI", desc: "Gemini AI memberi tips pola makan & edukasi gizi." }
    ];
    return React.createElement(
        "section",
        { className: "py-16 bg-blue-50" },
        React.createElement("div", { className: "container mx-auto px-6" },
            React.createElement("h2", { className: "text-3xl font-bold text-gray-800 mb-10 text-center" }, "Cara Kerja Nutrify"),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" },
                steps.map(function(step, idx) {
                    return React.createElement(
                        "div",
                        { key: idx, className: "bg-white rounded-lg shadow p-8 flex flex-col items-center fade-in" },
                        React.createElement("div", { className: "w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full mb-4" },
                            React.createElement("i", { "data-lucide": step.icon, className: "w-7 h-7 text-blue-600" })
                        ),
                        React.createElement("h3", { className: "font-semibold text-lg text-gray-800 mb-2 text-center" }, (idx + 1) + ". " + step.title),
                        React.createElement("p", { className: "text-gray-600 text-sm text-center" }, step.desc)
                    );
                })
            )
        )
    );
}
