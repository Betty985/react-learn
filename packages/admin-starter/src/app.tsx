import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Test from "./components/ArticleList";
const App: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Test />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>什么都没有呢~</p>
              <p>没有匹配到任何路由</p>
            </main>
          }
        />
      </Routes>
    </>
  );
};
export default App;
