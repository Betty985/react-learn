import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import React from "react";
import { Provider } from "mobx-react";
import App from "./app";
import stores from "./stores";
import ErrorBoundary from "./components/ErrorBoundary";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ErrorBoundary>
    <Provider {...stores}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ErrorBoundary>
);
