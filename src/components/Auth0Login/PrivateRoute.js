import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from './Auth0Wrapper';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      console.log(loginWithRedirect);
      return;
    }
    const fn = async () => {
      const login = await loginWithRedirect({
        appState: { targetUrl: path },
      });
      console.log(login);
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);
  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
