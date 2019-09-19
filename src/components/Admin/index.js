import React, { Component } from 'react';
// import { Route, Switch } from "react-router-dom";
 import SideMenu from './SideMenu/index';


import { ContentWrapper, AdminWrapper } from "./Admin.style";


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
       <SideMenu menuSizeObserver={this.menuSizeObserver} />
        {/* <ContentWrapper>
          <Switch>
            <Route
             path={USERS}
             render={props => <Users {...props} />} />
          </Switch>
        </ContentWrapper> */}
       <h1>hello</h1>
      </AdminWrapper>
    )
  }
}

