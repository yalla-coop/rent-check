import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "antd";
import logo from "../../../assets/logo.png";

// IMPORT NAV URLS HERE

// IMPORT STYLING HERE
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

    return (
      <S.Header>
        <NavLink to="/">
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
              to="/"
              onClick={() => {
                this.toggleMenu();
              }}
            >
              Add Rental Data
            </S.MenuLink>
            <S.MenuLink
              to="/"
              onClick={() => {
                this.toggleMenu();
              }}
            >
              Rental Map
            </S.MenuLink>
            <S.MenuLink
              to="/"
              onClick={() => {
                this.toggleMenu();
              }}
            >
              My Account
            </S.MenuLink>
            <S.MenuLink
              to="/"
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
