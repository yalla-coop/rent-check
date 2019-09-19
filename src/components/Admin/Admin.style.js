import styled from "styled-components";

export const AdminWrapper = styled.div`
  min-height: 100vh;
`;
export const ContentWrapper = styled.div`
  padding: 2rem;
  padding-left: calc(${props => props.marginLeft}px + 2rem);
`;
