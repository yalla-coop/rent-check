import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import SideMenu from './SideMenu/index';
import Users from "./Users";
import RentalData from "./RentalData";

import { routes } from "./../../constants/adminRoutes";
import { ContentWrapper, AdminWrapper } from "./Admin.style";

const { USERS, RENTAL_DATA } = routes;

export default class Admin extends Component {
  state = {
    menuWidth: 0
  };

  menuSizeObserver = width => {
    this.setState({ menuWidth: width });
  };

  render() {
    return (
      <AdminWrapper>
       <SideMenu menuSizeObserver={this.menuSizeObserver}  />
       <ContentWrapper marginLeft={`${Math.ceil(this.state.menuWidth)}`}>
          <Switch>
            <Route
             path={USERS}
             render={props => <Users {...props} />} />
            <Route
             path={RENTAL_DATA}
             render={props => <RentalData {...props} />} />
          </Switch>
        </ContentWrapper>
      </AdminWrapper>
    )
  }
}

