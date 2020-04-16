import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      //Felix Wong
      //Dev only
      //localStorage
      sessionStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/SignIn", state: { from: props.location } }}
        />
      )
    }
  />
);
