import React from 'react';
import { Switch } from 'react-router-dom';

// import routes here
import { MAP_URL, CONTROL_PANEL_URL } from '../constants/navRoutes';

// import components here
import MapInterface from './MapInterface';
import Admin from './Admin';
import PrivateRoute from './Auth0Login/PrivateRoute';
import RentalForm from './RentalForm';

const Router = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={MapInterface} />
      <PrivateRoute path="/admin" component={Admin} />
      <PrivateRoute path="/add-rental-data" component={RentalForm} />
      <PrivateRoute exact path={MAP_URL} component={MapInterface} />
      <PrivateRoute path={CONTROL_PANEL_URL} component={Admin} />
    </Switch>
  );
};

export default Router;
