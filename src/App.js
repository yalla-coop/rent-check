import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "./components";

import './tachyons.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes />
        </div>
      </Router>
    );
  }
}
