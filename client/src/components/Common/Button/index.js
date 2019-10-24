import React from "react";
import styled, { css } from "styled-components";
import { Spin, Icon } from "antd";

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
  display: flex;
  justify-content: center;
  align-items: center;

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
`;

export const roundStyles = css`
  height: ${props => props.height || "32px"};
  width: ${props => props.width || "160px"};
  border-radius: 16px;
  &::after {
    border-radius: 16px;
  }
`;

export const primaryStyles = css`
  background-color: ${({ bg }) => bg || "#386A9B"};
  color: ${({ color }) => color || "white"};
`;

export const outlineStyles = css`
  background: none;
  border: ${({ color }) =>
    color ? `${color} 1px solid` : `var(--primary) 1px sold`};
  color: ${({ color }) => color || "var(--primary"};

  &:active::after {
    background: ${({ color }) => color || "var(--primary"};
    opacity: 0.1;
  }
`;

export const negativeStyles = css`
  background: firebrick;
  color: white;
`;

const StyledButton = styled.button`
  ${sharedStyles};
  ${props => props.type === "primary" && roundStyles}
  ${props => props.type === "primary" && primaryStyles}
  ${props => props.type === "outline" && roundStyles}
  ${props => props.type === "outline" && outlineStyles}
  ${props => props.type === "negative" && roundStyles}
  ${props => props.type === "negative" && negativeStyles}
`;

export const ButtonSpinner = () => {
  // antd spinner for if the button request is loading
  const antIcon = (
    <Icon type="loading" style={{ fontSize: 16, color: "white" }} spin />
  );
  return <Spin indicator={antIcon} style={{ marginRight: ".5rem" }} />;
};

const Button = ({ text, disabled, loading, type, ...props }) => {
  return (
    <StyledButton
      aria-label={text}
      type={type}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <ButtonSpinner />}
      {text}
    </StyledButton>
  );
};

export default Button;
