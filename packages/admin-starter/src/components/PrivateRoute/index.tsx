import { observer } from "mobx-react";
import React, { FC } from "react";
import useStores from "../../hooks/useStores";
import { Route } from "react-router-dom";
const PrivateRoute: FC = observer(() => {
  const { userStore, commonStore } = useStores();
  if (userStore.currentUser) return <Route {...commonStore} />;
  return <Route path="/" />;
});

export default PrivateRoute;
