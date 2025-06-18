function App() {
    React.useEffect(() => {
        lucide.createIcons();
    }, []);
    return React.createElement(
        "div", {},
        React.createElement(Header, null),
        React.createElement(FoodListHero, null),
        React.createElement(FoodCategories, null),
        React.createElement(Footer, null)
    );
}
ReactDOM.render(React.createElement(App), document.getElementById('root'));
