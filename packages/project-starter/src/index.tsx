import React from "react";
import ReactDOM from "react-dom/client";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import registerServiceWorker from "./registerServiceWorker";
import Container from "./containers/Container";
import SignIn from "./containers/Auth/signIn";
import SignUp from "./containers/Auth/signUp";
import { Root } from "./containers/Root";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Root>
      <Switch>
        <Route path="/signIn" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/" component={Container} />
      </Switch>
    </Root>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
registerServiceWorker();
