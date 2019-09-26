import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import components here
import MapInterface from './MapInterface';
import Admin from './Admin';
import RentalForm from './RentalForm';

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={MapInterface} />
      <Route path="/admin" component={Admin} />
      <Route path="/profile" component={RentalForm} />
    </Switch>
  );
}
