import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';

import { useAuth0 } from '../../Auth0Login';

const Login = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: `${window.location.origin}/login`,
    });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '150px',
      }}
    >
      {!isAuthenticated ? (
        <button
          type="button"
          id="qsLoginBtn"
          onClick={() => loginWithRedirect({})}
        >
          Log in
        </button>
      ) : (
        <RouterNavLink
          to="#"
          id="qsLogoutBtn"
          onClick={() => logoutWithRedirect()}
        >
          Log out
        </RouterNavLink>
      )}
    </div>
  );
};

export default Login;
