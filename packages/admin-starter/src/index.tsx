import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import { Provider } from "mobx-react";
import App from "./app";
import stores from "./stores";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider {...stores}>
    <Router>
      <App />
    </Router>
  </Provider>
);
