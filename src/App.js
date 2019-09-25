import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components';

import './tachyons.css';
import 'antd/dist/antd.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes />
      </div>
    </Router>
  );
}
