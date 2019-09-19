import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import components here
import MapInterface from './MapInterface';

export default function index(props) {
  return (
    <Switch>
      <Route path="/" component={MapInterface} {...props} />
    </Switch>
  );
}
