import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';
import logo from '../../../assets/logo.png';

import { useAuth0 } from '../../../Auth0Login';

// NAV URLS
import {
  MAP_URL,
  ADD_RENTAL_URL,
  ACCOUNT_URL,
  CONTROL_PANEL_URL,
} from '../../../constants/navRoutes';

// STYLING
import * as S from './Nav.style';

const Nav = ({ role }) => {
  const [menuView, setMenuView] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const toggleMenu = () => {
    setMenuView(!menuView);
  };

  const logoutWithRedirect = () =>
    logout({
      returnTo: `${window.location.origin}/login`,
    });

  return (
    <S.Header>
      <NavLink to={MAP_URL}>
        <S.Img src={logo} alt="East End Trades Guild logo" />
      </NavLink>
      <S.HeaderTitle>
        RENT
        <S.BoldPink>CHECK</S.BoldPink>
      </S.HeaderTitle>
      <S.MenuButton onClick={toggleMenu}>
        {menuView ? (
          <Icon
            type="close-square"
            style={{ fontSize: 24, color: '#386a9b' }}
          />
        ) : (
          <Icon type="menu" style={{ fontSize: 24, color: '#386a9b' }} />
        )}
      </S.MenuButton>
      {menuView && (
        <>
          {!isAuthenticated ? (
            <S.Menu>
              <S.Logout onClick={() => loginWithRedirect()}>Log in</S.Logout>
            </S.Menu>
          ) : (
            <S.Menu>
              <S.MenuLink
                to={MAP_URL}
                onClick={() => {
                  toggleMenu();
                }}
              >
                Rental Map
              </S.MenuLink>
              <S.MenuLink
                to={{
                  pathname: MAP_URL,
                  state: { search: true },
                }}
                onClick={() => {
                  toggleMenu();
                }}
              >
                Search Postcode
              </S.MenuLink>
              <S.MenuLink
                to={ADD_RENTAL_URL}
                onClick={() => {
                  toggleMenu();
                }}
              >
                Add Rental Data
              </S.MenuLink>
              {role !== 'standard' && (
                <S.MenuLink
                  to={CONTROL_PANEL_URL}
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  Control Panel
                </S.MenuLink>
              )}
              <S.MenuLink
                to={ACCOUNT_URL}
                onClick={() => {
                  toggleMenu();
                }}
              >
                My Account
              </S.MenuLink>
              <S.Logout onClick={() => logoutWithRedirect()}>Log Out</S.Logout>
            </S.Menu>
          )}
        </>
      )}
    </S.Header>
  );
};

export default Nav;
