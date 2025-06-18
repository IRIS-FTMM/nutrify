function App() {
    try {
        React.useEffect(() => {
            lucide.createIcons();
            animateOnScroll();
        }, []);

        return React.createElement(
            "div",
            { "data-name": "app", "data-file": "app.js" },
            React.createElement(Header, null),
            React.createElement(Hero, null),
            React.createElement(AboutSection, null),
            React.createElement(FeaturesSection, null),  // Tambahkan fitur
            React.createElement(HowItWorksSection, null),  // Tambahkan cara kerja
            React.createElement(CalorieCalculatorTeaser, null),
            React.createElement(FoodsListTeaser, null),
            React.createElement(Footer, null),
            React.createElement(ScrollToTop, null)
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

// Render App saja, bukan komponen individual
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));