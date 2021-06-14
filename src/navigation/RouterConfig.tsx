import React from "react";
import { Switch, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { NotFound } from "./NotFound";
import RouteURLS from "./CONSTANTS";
import PrivateRoute from "./PrivateRoute";
import Article from "../pages/Article";
import Articles from "../pages/Articles";
import ProfileForm from "../pages/ProfileForm";
import SignUpForm from "../pages/SignUpForm";
import SignInForm from "../pages/SignInForm";
import ArticleForm from "../pages/ArticleForm";

export const RouterConfig = observer(() => {
  return (
    <div>
      <Switch>
        <Route
          path={[RouteURLS.HOME, RouteURLS.ARTICLES]}
          exact
          component={Articles}
        />
        <Route path={RouteURLS.EDIT_ARTICLE} exact component={ArticleForm} />
        <Route path={RouteURLS.ARTICLE} component={Article} />
        <Route path={RouteURLS.SIGN_UP} component={SignUpForm} />
        <Route path={RouteURLS.SIGN_IN} component={SignInForm} />
        <PrivateRoute
          path={RouteURLS.PROFILE}
          exact={true}
          component={ProfileForm}
        />
        <PrivateRoute
          path={RouteURLS.NEW_ARTICLE}
          exact={true}
          component={ArticleForm}
        />

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
});
