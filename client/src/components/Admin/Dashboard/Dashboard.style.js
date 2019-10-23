import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Logo = styled.img`
  width: 50vw;
  heightL auto;
`;

export const Headline = styled.h1.attrs({
  className: 'avenir f4 f2-l mb3 mb5-l',
})``;
