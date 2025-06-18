function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        lucide.createIcons(); // Pastikan lucide sudah didefinisikan
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigate = function (href) {
        window.location.href = href;
        setIsMenuOpen(false);
    };

    return React.createElement(
        "header",
        { "data-name": "header", "data-file": "components/Header.js", className: `fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}` },
        React.createElement(
            "nav",
            { className: "container mx-auto px-6 py-4" },
            React.createElement(
                "div",
                { className: "flex items-center justify-between" },
                React.createElement(
                    "div",
                    { className: "flex items-center space-x-2" },
                    React.createElement("i", { "data-lucide": "camera", className: `w-8 h-8 ${isScrolled ? 'text-blue-600' : 'text-white'}` }),
                    React.createElement("span", { className: `text-xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}` }, "Nutrify")
                ),
                React.createElement(
                    "div",
                    { className: "hidden md:flex items-center space-x-8" },
                    React.createElement("button", {
                        onClick: function () { navigate('/about'); },
                        className: (isScrolled ? "text-gray-600" : "text-white") + " hover:text-blue-500 transition-colors"
                    }, "Tentang"),
                    React.createElement("button", {
                        onClick: function () { navigate('/calculate-calorie'); },
                        className: (isScrolled ? "text-gray-600" : "text-white") + " hover:text-blue-500 transition-colors"
                    }, "Kalkulator Kalori"),
                    React.createElement("button", {
                        onClick: function () { navigate('/foods-list'); },
                        className: (isScrolled ? "text-gray-600" : "text-white") + " hover:text-blue-500 transition-colors"
                    }, "Daftar Makanan"),
                    React.createElement("button", {
                        onClick: function () { navigate('/detect'); },
                        className: "bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors pulse-glow"
                    }, "Deteksi")
                ),
                React.createElement("button", {
                    className: "md:hidden",
                    onClick: function () { setIsMenuOpen(!isMenuOpen); }
                },
                    React.createElement("i", { "data-lucide": "menu", className: `w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}` })
                )
            ),
            isMenuOpen && React.createElement(
                "div",
                { className: "md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg" },
                React.createElement(
                    "div",
                    { className: "flex flex-col space-y-4 p-4" },
                    React.createElement("button", { onClick: function () { navigate('/about'); }, className: "text-gray-600 hover:text-blue-600 text-left" }, "Tentang"),
                    React.createElement("button", { onClick: function () { navigate('/calculate-calorie'); }, className: "text-gray-600 hover:text-blue-600 text-left" }, "Kalkulator Kalori"),
                    React.createElement("button", { onClick: function () { navigate('/foods-list'); }, className: "text-gray-600 hover:text-blue-600 text-left" }, "Daftar Makanan"),
                    React.createElement("button", { onClick: function () { navigate('/detect'); }, className: "text-white bg-blue-600 rounded-lg px-4 py-2 mt-2" }, "Deteksi")
                )
            )
        )
    );
}
