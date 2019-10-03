import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { breakpointsMax } from '../../../constants/breakpoints';

export const TopSection = styled.section`
  padding: 1rem 0 1.5rem 1.5rem;
  display: flex;

  @media ${breakpointsMax.tablet} {
    flex-direction: column;
    align-self: flex-start;
  }
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

export const BtnWrapper = styled.span`
  margin: 0 auto;
  display: flex;

  @media ${breakpointsMax.tablet} {
    flex-direction: column;
  }
`;

export const GoBackBtn = styled.button`
  background: none;
  outline: none;
  border: none;
  color: var(--gray);
  cursor: pointer;
  margin-bottom: 0.5rem;
  font-weight: 500;

  :hover,
  :active {
    color: var(--pink);
  }
`;

export const Summary = styled.section`
  display: flex;
  background: var(--blue);
  justify-content: space-between;
  color: var(--white);
  align-items: center;
  position: relative;
  padding: 0.5rem 1rem;

  :before {
    content: ' ';
    background: var(--blue);
    position: absolute;
    width: 100vw;
    left: -1rem;
    height: 100%;
  }
`;

export const Stat = styled.span`
  display: flex;
  z-index: 2;
`;

export const Title = styled.p`
  font-weight: 700;
  margin: 0 0.5rem 0 0;
`;

export const Data = styled.p`
  margin: 0;
  text-transform: ${props => props.capitalize && props.data && 'capitalize'};
`;

export const MainSection = styled.section`
  padding: 2rem 1rem;
`;

export const StyledTable = styled.table`
  width: 100%;
`;

export const Row = styled.tr``;

export const TitleTD = styled.td`
  width: 20%;
  font-weight: 700;
  padding-bottom: 1rem;
`;

export const DataTD = styled.td`
  width: 30%;
  padding-bottom: 1rem;
  font-style: ${({ data }) => !data && 'italic'};
  opacity: ${({ data }) => !data && '0.8'};
  padding-left: ${({ long }) => !long && '0.5rem'};
  text-transform: ${props => props.capitalize && props.data && 'capitalize'};
`;

export const LongTitleTD = styled.td`
  font-weight: 700;
  width: 100%;
`;

export const LongDataTD = styled.td`
  width: 100%;
`;
