import React from 'react';
import logo from '../../assets/logo.png';
import {
  MyHeader,
  HeaderLink,
  HeaderTitle,
  BoldPink,
  HeaderLogo,
} from './Header.styles';

const Header = ({ openSearch }) => (
  <MyHeader>
    <HeaderLink href="/">
      <HeaderLogo src={logo} alt="East End Trades Guild" />
    </HeaderLink>
    <HeaderTitle>
      RENT
      <BoldPink>CHECK</BoldPink>
    </HeaderTitle>
    <HeaderLink href="#" onClick={openSearch}>
      Search
    </HeaderLink>
  </MyHeader>
);
export default Header;
