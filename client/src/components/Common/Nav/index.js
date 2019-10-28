import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "antd";
import logo from "../../../assets/logo.png";

// NAV URLS
import {
  MAP_URL,
  ADD_RENTAL_URL,
  CONTROL_PANEL_URL,
  STREET_REP_URL,
} from "../../../constants/navRoutes";

// STYLING
import * as S from "./Nav.style";

const Nav = ({ role }) => {
  const [menuView, setMenuView] = useState(false);

  const toggleMenu = () => {
    setMenuView(!menuView);
  };

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
            style={{ fontSize: 24, color: "#386a9b" }}
          />
        ) : (
          <Icon type="menu" style={{ fontSize: 24, color: "#386a9b" }} />
        )}
      </S.MenuButton>
      {menuView && (
        <S.Menu>
          <S.MenuLink
            to={MAP_URL}
            onClick={() => {
              toggleMenu();
            }}
          >
            View Map
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
            Search By Postcode
          </S.MenuLink>
          <S.MenuLink
            to={ADD_RENTAL_URL}
            onClick={() => {
              toggleMenu();
            }}
          >
            Add Your Data
          </S.MenuLink>
          <S.MenuLink
            to={STREET_REP_URL}
            onClick={() => {
              toggleMenu();
            }}
          >
            Street Reps
          </S.MenuLink>
          {role !== "standard" && (
            <S.MenuLink
              to={CONTROL_PANEL_URL}
              onClick={() => {
                toggleMenu();
              }}
            >
              Control Panel
            </S.MenuLink>
          )}
          {/* <S.MenuLink
            to={ACCOUNT_URL}
            onClick={() => {
              toggleMenu();
            }}
          >
            My Account
          </S.MenuLink> */}
          {/* THIS WILL NEED TO CLEAR COOKIE */}
          <S.MenuLink
            to={MAP_URL}
            onClick={() => {
              toggleMenu();
            }}
          >
            Log Out
          </S.MenuLink>
        </S.Menu>
      )}
    </S.Header>
  );
};

export default Nav;
