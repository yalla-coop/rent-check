import React from "react";
import { Route, Switch  } from "react-router-dom";

// import components here
import MapInterface from './MapInterface';
import Admin from './Admin'


export default function index() {
  return (
   <Switch>
      <Route exact path='/' component={MapInterface} />
      <Route path='/admin' component={Admin} />
   </Switch>
  )
}
