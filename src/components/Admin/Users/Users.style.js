import styled, { css } from 'styled-components';
import { Button } from 'antd';

const verify = css`
  color: green !important;
  border-color: green !important;
`;

const reject = css`
  color: red !important;
  border-color: red !important;
`;

export const UserButton = styled(Button).attrs({
  className: 'mr-1',
  size: 'small',
  ghost: true,
})`
  ${props => props.verify && verify}
  ${props => props.reject && reject}
`;
