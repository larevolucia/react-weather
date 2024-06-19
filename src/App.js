import logo from "./logo.svg";
import "./styles/App.css";
import Search from "./Search";

function App() {
  return (
    <div className="App">
      <div className="container">
        <header>
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <h1>Weather App</h1>
          <Search />
        </header>
        <footer className="shadow-sm rounded">
          <p>
            This app was coded by Lúcia Reis and is{" "}
            <a
              href="https://github.com/larevolucia/react-dictionary"
              target="_blank"
              rel="noreferrer"
            >
              open-sourced
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
