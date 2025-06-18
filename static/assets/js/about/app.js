function App() {
    React.useEffect(() => {
        lucide.createIcons();
        if (window.animateOnScroll) animateOnScroll();
    }, []);
    return React.createElement(
        "div", {},
        React.createElement(Header, null),
        React.createElement(AboutHero, null),
        React.createElement(AboutProjectSection, null),
        React.createElement(StatsSection, null),
        React.createElement(Features, { page: "about" }),
        React.createElement(HowItWorks, null),
        React.createElement(TeamSection, null),
        React.createElement(CreditSection, null),
        React.createElement(Footer, null)
    );
}
ReactDOM.render(React.createElement(App), document.getElementById('root'));
