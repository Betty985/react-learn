import ReactDOM from "react-dom";
import { BrowserRouter as Router   } from "react-router-dom";
import React from "react";
import { Provider } from "mobx-react";
import stores from "@/stores";
import App from "./app";
const root = document.querySelector("#root");
ReactDOM.render(
  <Provider {...stores}>
   <Router>
      <App />
    </Router >
  </Provider>,
  root
);

