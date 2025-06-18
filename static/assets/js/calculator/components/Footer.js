function Footer() {
    React.useEffect(() => { lucide.createIcons(); }, []);
    return React.createElement(
        "footer",
        { className: "bg-gray-900 text-white py-12" },
        React.createElement(
            "div",
            { className: "container mx-auto px-6 text-center" },
            React.createElement(
                "div",
                { className: "flex flex-col items-center space-y-2" },
                React.createElement("i", { "data-lucide": "camera", className: "w-8 h-8 text-blue-400" }),
                React.createElement("span", { className: "text-xl font-bold" }, "Nutrify")
            ),
            React.createElement("p", { className: "text-gray-400 my-6 max-w-xl mx-auto" },
                "Nutrify adalah platform deteksi makanan berbasis YOLO untuk membantu masyarakat mengenali makanan dan memahami gizi sehari-hari."
            ),
            React.createElement(
                "div",
                { className: "flex space-x-4 justify-center mb-6" },
                React.createElement("a", { href: "https://github.com/arknsa/calorie-cam", target: "_blank", rel: "noopener" },
                    React.createElement("i", { "data-lucide": "github", className: "w-6 h-6 text-gray-400 hover:text-blue-400" })
                )
            ),
            React.createElement("p", { className: "text-gray-400" }, "© 2025 Nutrify. All rights reserved.")
        )
    );
}
