import React from "react";
import App from "./App";

import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./context/CurrentUserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Router holds all the state required and keeps the UI in sync with the URL.
  <Router>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </Router>
);

reportWebVitals();
