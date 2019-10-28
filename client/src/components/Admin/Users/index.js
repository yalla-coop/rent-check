// Router for User routes
import React from "react";
import { Route, Switch } from "react-router-dom";

// components
import AllUsers from "./AllUsers";

// routes
import { routes } from "../../../constants/adminRoutes";

// status as filter base of users
import { status, roles } from "../../../constants/users";

const {
  USERS_ALL,
  USERS_VERIFY,
  USERS_SUPER_REQ,
  USERS_VERIFIED,
  USERS_SUPER,
} = routes;

export default function Users() {
  return (
    <Switch>
      <Route exact path={USERS_ALL} render={props => <AllUsers {...props} />} />
      <Route
        exact
        path={USERS_VERIFY}
        render={props => <AllUsers {...props} statusProp={status.UNVERIFIED} />}
      />
      <Route
        exact
        path={USERS_SUPER_REQ}
        render={props => (
          <AllUsers {...props} statusProp={status.AWAITING_SUPER} />
        )}
      />
      <Route
        exact
        path={USERS_VERIFIED}
        render={props => <AllUsers {...props} statusProp={status.VERIFIED} />}
      />
      <Route
        exact
        path={USERS_SUPER}
        render={props => <AllUsers {...props} statusProp={roles.SUPERUSER} />}
      />
    </Switch>
  );
}
