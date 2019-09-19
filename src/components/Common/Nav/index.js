import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "antd";
import logo from "../../../assets/logo.png";

// NAV URLS
import {
  LANDING_URL,
  MAP_URL,
  ADD_RENTAL_URL,
  ACCOUNT_URL,
  CONTROL_PANEL_URL
} from "./../../../constants/navRoutes";

// STYLING
import * as S from "./Nav.style";

export default class Nav extends Component {
  state = {
    menuOpen: false
  };

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { menuOpen } = this.state;

    // this may need to change once we set up auth and what props to send through
    const { role, openSearch } = this.props;

    return (
      <S.Header>
        <NavLink to={LANDING_URL}>
          <S.Img src={logo} alt="East End Trades Guild logo" />
        </NavLink>
        <S.HeaderTitle>
          RENT
          <S.BoldPink>CHECK</S.BoldPink>
        </S.HeaderTitle>
        <S.MenuButton onClick={this.toggleMenu}>
          {menuOpen ? (
            <Icon
              type="close-square"
              style={{ fontSize: 24, color: "#386a9b" }}
            />
          ) : (
            <Icon type="menu" style={{ fontSize: 24, color: "#386a9b" }} />
          )}
        </S.MenuButton>
        {menuOpen && (
          <S.Menu>
            <S.MenuLink
              to={MAP_URL}
              onClick={() => {
                this.toggleMenu();
              }}
            >
              Rental Map
            </S.MenuLink>
            <S.MenuLink
              to={MAP_URL}
              onClick={() => {
                this.toggleMenu();
                openSearch();
              }}
            >
              Search Postcode
            </S.MenuLink>
            <S.MenuLink
              to={ADD_RENTAL_URL}
              onClick={() => {
                this.toggleMenu();
              }}
            >
              Add Rental Data
            </S.MenuLink>
            {role !== "standard" && (
              <S.MenuLink
                to={CONTROL_PANEL_URL}
                onClick={() => {
                  this.toggleMenu();
                }}
              >
                Control Panel
              </S.MenuLink>
            )}
            <S.MenuLink
              to={ACCOUNT_URL}
              onClick={() => {
                this.toggleMenu();
              }}
            >
              My Account
            </S.MenuLink>
            {/* THIS WILL NEED TO CLEAR COOKIE */}
            <S.MenuLink
              to={LANDING_URL}
              onClick={() => {
                this.toggleMenu();
              }}
            >
              Log Out
            </S.MenuLink>
          </S.Menu>
        )}
      </S.Header>
    );
  }
}
