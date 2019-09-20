import React, { Component } from 'react';
import logo from '../../../assets/logo.png';

import { Logo, DashboardContainer, Headline } from './Dashboard.style';

export default class Dashboard extends Component {
  render() {
    return (
      <DashboardContainer>
        <Headline>Welcome Back, Admin</Headline>
        <Logo src={logo} alt="East End Trades Guild" />
      </DashboardContainer>
    );
  }
}
