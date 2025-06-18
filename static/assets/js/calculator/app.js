function App() {
    React.useEffect(() => {
      lucide.createIcons();
      if (window.animateOnScroll) animateOnScroll();
    }, []);
    return React.createElement(
      "div", {},
      React.createElement(Header, null),
      React.createElement(CalorieCalculatorHero, null),
      React.createElement(CalorieForm, null),
      React.createElement(Footer, null)
    );
  }
  ReactDOM.render(React.createElement(App), document.getElementById('root'));
  