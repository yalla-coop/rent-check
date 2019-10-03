import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components';
import Nav from './components/Common/Nav';

import GlobalStyle from './globalStyle';
import './tachyons.css';
import 'antd/dist/antd.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <GlobalStyle />
        <Nav />
        <Routes />
      </div>
    </Router>
  );
}
