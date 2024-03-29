import { inject, observer } from "mobx-react";
import React from "react";
import { Redirect, Route } from "react-router";

@inject("userStore", "commonStore")
@observer
export default class PrivateRoute extends React.Component {
  render(): React.ReactNode {
    const { userStore, ...restProps } = this.props;
    if (userStore.currentUser) return <Route {...restProps} />;
    return <Redirect to="/" />;
  }
}
