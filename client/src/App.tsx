import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import Calculator from "./components";
import darkTheme from "./services/theme";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Calculator />
    </ThemeProvider>
  );
}

export default App;
