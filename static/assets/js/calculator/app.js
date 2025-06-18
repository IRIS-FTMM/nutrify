function App() {
  React.useEffect(() => {
      if (window.lucide) {
          lucide.createIcons();
      }
      if (window.animateOnScroll) {
          animateOnScroll();
      }
  }, []);

  return React.createElement(
      "div",
      { className: "app-wrapper" },
      React.createElement(Header, null),
      React.createElement(CalorieCalculatorHero, null),
      React.createElement(CalorieForm, null),
      React.createElement(Footer, null)
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));