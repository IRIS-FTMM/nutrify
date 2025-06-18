function ScrollToTop() {
    try {
        const [isVisible, setIsVisible] = React.useState(false);

        React.useEffect(() => {
            lucide.createIcons();
            const toggleVisibility = () => {
                setIsVisible(window.pageYOffset > 300);
            };
            window.addEventListener('scroll', toggleVisibility);
            return () => window.removeEventListener('scroll', toggleVisibility);
        }, []);

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        return React.createElement(
            "button",
            {
                "data-name": "scroll-to-top",
                "data-file": "components/ScrollToTop.js",
                onClick: scrollToTop,
                className:
                    "fixed bottom-8 right-8 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 pulse-glow " +
                    (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16")
            },
            React.createElement("i", { "data-lucide": "arrow-up", className: "w-6 h-6" })
        );
    } catch (error) {
        console.error('ScrollToTop component error:', error);
        reportError(error);
    }
}
