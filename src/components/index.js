import React, { useEffect, useContext } from 'react';
import { Switch } from 'react-router-dom';

// import routes here
import { MAP_URL, CONTROL_PANEL_URL } from '../constants/navRoutes';

// import components here
import MapInterface from './MapInterface';
import Admin from './Admin';
import {
  useAuth0,
  Auth0Provider,
  Auth0Context,
} from './Auth0Login/Auth0Wrapper';
import PrivateRoute from './Auth0Login/PrivateRoute';
// import { routes } from '../constants/adminRoutes';

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

function Index() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
  }, []);
  const { loading } = useAuth0();
  if (loading) return <h2>Loading...</h2>;
  return (
    <Switch>
      <PrivateRoute exact path="/" component={MapInterface} />
      <PrivateRoute path={CONTROL_PANEL_URL} component={Admin} />
    </Switch>
  );
}

// Authentication Wrapper
const Routes = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Index />
    </Auth0Provider>
  );
};

export default Routes;
