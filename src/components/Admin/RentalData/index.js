import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AllRentalData from './AllRentalData';

import { routes } from './../../../constants/adminRoutes';


 const { RENTAL_DATA_ALL } = routes;

export default class RentalData extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path={RENTAL_DATA_ALL}
          render={props => <AllRentalData {...props} />}
        />
      </Switch>
    )
  }
}
