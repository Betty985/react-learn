import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Timer, Todo } from "./components/index";
import "antd/dist/antd.css";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="Timer" element={<Timer />} />
        <Route path="Todo" element={<Todo />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
