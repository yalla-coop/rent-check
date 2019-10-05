import React from 'react';
import { Switch } from 'react-router-dom';

// import routes here
import { MAP_URL, CONTROL_PANEL_URL } from '../constants/navRoutes';

// import components here
import MapInterface from './MapInterface';
import Admin from './Admin';
import { Auth0Provider } from './Auth0Login/Auth0Wrapper';
import PrivateRoute from './Auth0Login/PrivateRoute';
import RentalForm from './RentalForm';

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

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

// Authentication Wrapper
const Routes = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Router />
    </Auth0Provider>
  );
};

export default Routes;
