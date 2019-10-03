import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import routes here
import { MAP_URL, CONTROL_PANEL_URL } from '../constants/navRoutes';

// import components here
import MapInterface from './MapInterface';
import Admin from './Admin';

export default function Router(props) {
  return (
    <Switch>
      <Route exact path={MAP_URL} component={MapInterface} />
      <Route path={CONTROL_PANEL_URL} component={Admin} />
    </Switch>
  );
}
