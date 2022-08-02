import ReactDOM from "react-dom";
import React from "react";
import { Timer } from "./components/index";
import { FC } from "react";
const App: FC = () =>  (<Timer />) ;
ReactDOM.render(<App />, document.querySelector('#root'));
