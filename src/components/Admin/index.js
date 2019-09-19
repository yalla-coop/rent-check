// Router Component for admin routes
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import SideMenu from './SideMenu/index';
import Users from './Users';
import RentalData from './RentalData';

// Styles
import { ContentWrapper, AdminWrapper } from './Admin.style';

// Routes
import { routes } from '../../constants/adminRoutes';

const { USERS, RENTAL_DATA } = routes;

export default class Admin extends Component {
  state = {
    menuWidth: 0,
  };

  menuSizeObserver = width => {
    this.setState({ menuWidth: width });
  };

  render() {
    const { menuWidth } = this.state;

    return (
      <AdminWrapper>
        <SideMenu menuSizeObserver={this.menuSizeObserver} />
        <ContentWrapper marginLeft={`${Math.ceil(menuWidth)}`}>
          <Switch>
            <Route path={USERS} render={props => <Users {...props} />} />
            <Route
              path={RENTAL_DATA}
              render={props => <RentalData {...props} />}
            />
          </Switch>
        </ContentWrapper>
      </AdminWrapper>
    );
  }
}
