import React from 'react';
import { Switch } from 'react-router-dom';

// import routes here
import { MAP_URL, CONTROL_PANEL_URL } from '../constants/navRoutes';

// import components here
import MapInterface from './MapInterface';
import Admin from './Admin';
import { useAuth0, Auth0Provider } from './Auth0Login/Auth0Wrapper';
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
  const { loading } = useAuth0();
  if (loading) return <h2>Loading...</h2>;
  return (
    <Switch>
      <PrivateRoute exact path={MAP_URL} component={MapInterface} />
      <PrivateRoute path={CONTROL_PANEL_URL} component={Admin} />
    </Switch>
  );
}

// Authentication Wrapper
const Routes = () => {
  return (
    <Auth0Provider
      domain="dev-8ho9rcxd.auth0.com"
      client_id="CFV8U2DREQdjLVMWN4ALJ0xNqldwxHsV"
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Index />
    </Auth0Provider>
  );
};

export default Routes;
