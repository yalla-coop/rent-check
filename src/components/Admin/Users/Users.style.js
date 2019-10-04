import styled from 'styled-components';

export const RoleTile = styled.span`
  background: #333333;
  color: #ffffff;
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  border-radius: 10%;
`;

export const UserTitle = styled.div`
  display: flex;
  flex-direction: column;
  @media all and (min-width: 600px) {
    flex-direction: row;
  }
`;
