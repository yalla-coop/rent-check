import styled from "styled-components";
import { Button } from "antd";

export const SideMenuWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 1.5rem;
  bottom: 0;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  right: -27%;
  transform: translate(-50%, -50%);
`;
