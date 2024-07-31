import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </BrowserRouter>
  </Provider>
);
