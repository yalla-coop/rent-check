import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './Auth0Login/PrivateRoute';

// import routes here
import { MAP_URL, CONTROL_PANEL_URL } from '../constants/navRoutes';

// import components here
import MapInterface from './MapInterface';
import Admin from './Admin';
import RentalForm from './RentalForm';
import Login from './Auth0Login/Login';

export default function Router() {
  return (
    <Switch>
      {/* <PrivateRoute exact path="/" component={MapInterface} /> */}
      <Route exact path="/" component={MapInterface} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/admin" component={Admin} />
      <PrivateRoute path="/add-rental-data" component={RentalForm} />
      <PrivateRoute exact path={MAP_URL} component={MapInterface} />
      <PrivateRoute path={CONTROL_PANEL_URL} component={Admin} />
    </Switch>
  );
}
