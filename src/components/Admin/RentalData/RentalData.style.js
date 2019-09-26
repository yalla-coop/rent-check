import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.section`
  padding: 1rem 0 1.5rem 1.5rem;
`;

export const StyledLink = styled(Link)`
  font-weight: 700;
  color: var(--blue);
  font-size: 1.25rem;

  :hover,
  :active {
    color: var(--pink);
  }
`;
