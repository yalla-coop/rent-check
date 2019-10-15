import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './components';
import Nav from './components/Common/Nav';
import history from './utils/history';

import GlobalStyle from './globalStyle';
import './tachyons.css';
import 'antd/dist/antd.css';

import { useAuth0 } from './Auth0Login';

export default function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div> Loading ...</div>;
  }

  return (
    <Router history={history}>
      <div className="App">
        <GlobalStyle />
        <Nav />
        <Routes />
      </div>
    </Router>
  );
}
