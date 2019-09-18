import React from 'react';
import styled, { css } from 'styled-components';
// import { Spin } from "antd"

const sharedStyles = css`
  position: relative;
  text-align: center;
  text-decoration: none;
  outline: none;
  border: 0;
  margin: ${props => props.margin || 0};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${props => props.disabled && !props.loading && 0.3};
  font-size: 1rem;

  &:hover::after {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: none;
  }
  &:active::after {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: rgba(84, 84, 85, 0.4);
    box-shadow: none;
  }
`

export const roundStyles = css`
  height: ${props => props.height || "35px"};
  width: ${props => props.width || "158px"};
  border-radius: 17.5px;
  &::after {
    border-radius: 17.5px;
  }
`;

export const primaryStyles = css`
  background-color: #386A9B;
  color: ${colors.white};
`;

export const negativeStyles = css`
  background: red;
  color: white;
`;

const StyledButton = styled.button`
  ${sharedStyles};
  ${props => props.type === "primary" && roundStyles}
  ${props => props.type === "primary" && primaryStyles}
  ${props => props.type === "negative" && roundStyles }
  ${props => props.type === "negative" && negativeStyles}
`

const Button = ({ text, diabled, loading, type }) => {
  return (
    <StyledButton aria-label={text} {...props} disabled={diabled || loading}>
      {label}
    </StyledButton>
  )
}

export default Button;