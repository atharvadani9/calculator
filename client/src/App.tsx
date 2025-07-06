import "./App.css";
import logo from "./logo.svg";
import { pingAPI } from "./services/api";

function App() {
  const ping = async () => {
    try {
      const response = await pingAPI();
      console.log(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  ping();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
