import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Header = styled.header`
  width: 100vw;
  z-index: 998;
  border-bottom: 1px solid #386a9b;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  background: white;
  padding: 0 1rem;
`;

export const Img = styled.img`
  height: 2rem;
`;

export const HeaderTitle = styled.span.attrs({
  className: "f3 avenir"
})``;

export const BoldPink = styled.span.attrs({
  className: "fw7 dark-pink"
})``;

export const MenuButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  outline: none;
`;

export const Menu = styled.nav`
  width: 30vw;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  background-color: white;
  height: calc(100vh - 3rem);
  border-top: 1px solid white;
  border-left: 1px solid #386a9b;
  top: calc(3rem - 1px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  transition: all ease 0.2s;
`;

export const MenuLink = styled(NavLink)`
  color: #386a9b;
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all ease 0.2s;

  :hover,
  :active {
    color: #d7448f;
    text-decoration: underline;
  }
`;
