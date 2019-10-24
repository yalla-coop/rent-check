import React from "react";
import logo from "../../../assets/logo.png";

import { Logo, DashboardContainer, Headline } from "./Dashboard.style";

export default function Dashboard() {
  return (
    <DashboardContainer>
      <Headline>Welcome Back, Admin</Headline>
      <Logo src={logo} alt="East End Trades Guild" />
    </DashboardContainer>
  );
}
