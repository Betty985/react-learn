import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "@/components/Header";
import Login from "@/pages/Login";
const App: FC = () => {
  return (
    <div>
      <Header/>
      <Switch>
        <Route  path="/login" component={Login}/>
      </Switch>
    </div>
  );
};
export default App;
