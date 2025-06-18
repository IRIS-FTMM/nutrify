function TeamSection() {
    var members = [
        { name: "Arkan Syafiq At'taqy", nim: "164221062", role: "AI & Fullstack", photo: "/static/images/About-Us/Arkan.jpg" },
        { name: "Shiba Salsabilla", nim: "164221078", role: "Frontend", photo: "/static/images/About-Us/Shiba.jpg" },
        { name: "Nazhifah Firyal Jasmine", nim: "164221083", role: "UI/UX & Data", photo: "/static/images/About-Us/Jasmine.jpg" },
        { name: "Ramadhan Eko Saputra", nim: "164221088", role: "Deployment", photo: "https://randomuser.me/api/portraits/men/22.jpg" }
    ];
    return React.createElement(
        "section", { className: "py-16 bg-blue-50" },
        React.createElement("div", { className: "container mx-auto px-6" },
            React.createElement("h2", { className: "text-3xl font-bold text-blue-700 mb-8 text-center" }, "Anggota Tim Nutrify"),
            React.createElement("p", { className: "text-gray-600 mb-10 text-center max-w-2xl mx-auto" },
                "Tim pengembang Nutrify terdiri dari mahasiswa dengan minat di bidang AI, frontend, data, dan cloud deployment."
            ),
            React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center" },
                members.map(function(m, idx) {
                    return React.createElement("div", { key: idx, className: "flex flex-col items-center bg-white rounded-lg shadow p-6" },
                        React.createElement("img", { src: m.photo, alt: m.name, className: "rounded-full w-24 h-24 mb-4 object-cover" }),
                        React.createElement("div", { className: "font-bold text-lg text-blue-700" }, m.name),
                        React.createElement("div", { className: "text-sm text-gray-600 mb-1" }, m.nim),
                        React.createElement("div", { className: "text-sm text-gray-500" }, m.role)
                    );
                })
            )
        )
    );
}
