function App() {
    return React.createElement(
        "div", {}, 
        React.createElement(Header, null),
        React.createElement(FoodList, null),
        React.createElement(Footer, null)
    );
}

ReactDOM.render(
    React.createElement(App),
    document.getElementById('root')
);
