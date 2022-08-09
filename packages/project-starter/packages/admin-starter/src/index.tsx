import ReactDOM from "react-dom";
import { BrowserRouter  } from "react-router-dom";
import React from "react";
import { Provider } from "mobx-react";
import stores from "@/stores";
import App from "./app";
import Header from "@/components/Header";
const root = document.querySelector("#root");
ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <Header />
      <App />
    </BrowserRouter>
  </Provider>,
  root
);

