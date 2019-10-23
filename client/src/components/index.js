import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import routes here
import { MAP_URL, CONTROL_PANEL_URL } from '../constants/navRoutes';

// import components here
import MapInterface from './MapInterface';
import Admin from './Admin';
import RentalForm from './RentalForm';
import StreetReps from "./StreetReps";

export default function Router(props) {
  return (
    <Switch>
      <Route exact path="/" component={MapInterface} />
      <Route path="/admin" component={Admin} />
      <Route path="/add-rental-data" component={RentalForm} />
      <Route path="/street-reps" component={StreetReps} />
      <Route exact path={MAP_URL} component={MapInterface} />
      <Route path={CONTROL_PANEL_URL} component={Admin} />
    </Switch>
  );
}
