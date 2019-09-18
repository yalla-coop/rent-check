import React from "react";
import { Route, Switch  } from "react-router-dom";

// import components here
import MapInterface from './MapInterface';


export default function index() {
  return (
   <Switch>
      <Route path='/' component={MapInterface} />
   </Switch>
  )
}
