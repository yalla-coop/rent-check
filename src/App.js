import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components';
import Nav from './components/Common/Nav';
import { Auth0Provider } from './components/Auth0Login/Auth0Wrapper';

import GlobalStyle from './globalStyle';
import './tachyons.css';
import 'antd/dist/antd.css';

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

export default function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Router>
        <div className="App">
          <GlobalStyle />
          <Nav />
          <Routes />
        </div>
      </Router>
    </Auth0Provider>
  );
}
