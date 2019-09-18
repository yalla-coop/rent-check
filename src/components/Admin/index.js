import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";

import { ContentWrapper, AdminWrapper } from "./Admin.style";

export default class Admin extends Component {
  render() {
    return (
      <AdminWrapper>
        {/* <SideMenu /> */}
        {/* <ContentWrapper>
          <Switch>
            <Route
             path={USERS}
             render={props => <Users {...props} />} />
          </Switch>
        </ContentWrapper> */}
        hello
      </AdminWrapper>
    )
  }
}
