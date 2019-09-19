import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AllUsers from './AllUsers';

import {routes} from './../../../constants/adminRoutes'

// const { USERS_ALL, USERS_VERIFY, USERS_SUPER_REQ, USERS_VERIFIED, USERS_SUPER } = routes;

 const { USERS_ALL } = routes;

export default class Users extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={USERS_ALL}
          render={props => <AllUsers {...props} />}
        />
        {/* <Route
          exact
          path={USERS_VERIFY}
          render={props => <VerifyUsers {...props} />}
        />
        <Route
          exact
          path={USERS_SUPER_REQ}
          render={props => <SuperReqUsers {...props} />}
        />
        <Route
          exact
          path={USERS_VERIFIED}
          render={props => <VerifiedUsers {...props} />}
        />
        <Route
          exact
          path={USERS_SUPER}
          render={props => <SuperUsers {...props} />}
        /> */}
      </Switch>
    )
  }
}
