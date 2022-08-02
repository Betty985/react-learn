import * as React from "react";
import { Outlet, Link } from "react-router-dom";
import routes from "./../config";
import { Button } from "antd";
import './../styles/index.css'
import "antd/dist/antd.css";
const App: React.FC = () => {
  return (
    <div className="app">
      <h1>mobx + react-router</h1>
      <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
        {routes.map((route) => (
          <Button key={route}>
            <Link to={"/" + route}>{route}</Link>
          </Button>
        ))}
      </nav>
      <Outlet />
    </div>
  );
};
export default App;
