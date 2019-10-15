import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import PrivateRoute from './Auth0Login/PrivateRoute';

// import routes here
import { MAP_URL, CONTROL_PANEL_URL } from '../constants/navRoutes';

// import components here
import MapInterface from './MapInterface';
import Admin from './Admin';
import RentalForm from './RentalForm';
import Login from './Auth0Login/Login';

import { useAuth0 } from '../Auth0Login';

function Router() {
  const { user } = useAuth0();
  useEffect(() => {
    // on didmount check if the user in db
    // if not this will add him
    const postUser = async () => {
      await axios.post('/.netlify/functions/addUser', user);
    };
    postUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Switch>
      <PrivateRoute
        exact
        path={MAP_URL}
        render={props => <MapInterface {...props} />}
      />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/add-rental-data" component={RentalForm} />
      <PrivateRoute path={CONTROL_PANEL_URL} component={Admin} />
    </Switch>
  );
}

export default Router;
