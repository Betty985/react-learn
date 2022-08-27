import React, { FC } from "react";
// import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
// import Login from "./pages/Login";
// import PrivateRoute from "./components/PrivateRoute";
// import Settings from "./pages/Settings";
// import Test from "./components/ArticleList";

import { routes, RouterGurad } from "./router";
{
  /* <PrivateRoute path="/settings" element={<Settings />} /> */
}
const App: FC = () => {
  return (
    <>
      <Header />
      {RouterGurad(routes)}
    </>
  );
};
export default App;
