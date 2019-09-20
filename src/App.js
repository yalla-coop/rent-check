import React, { Component } from "react";
import Routes from './components/';
import { BrowserRouter as Router } from "react-router-dom";

import "./tachyons.css";
import "antd/dist/antd.css";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Routes />
        </div>
      </Router>
    )
  }
}
