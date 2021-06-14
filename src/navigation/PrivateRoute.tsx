import { observer } from "mobx-react-lite";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useStores } from "../hooks/useStore";
import RouteURLS from "./CONSTANTS";

type TProps = {
  component: React.FC;
  path: string;
  exact: boolean;
};
const PrivateRoute: React.FC<TProps> = observer((props) => {
  const { userStore } = useStores();
  const { isAuth } = userStore;

  return isAuth ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to={RouteURLS.SIGN_IN} />
  );
});
export default PrivateRoute;
