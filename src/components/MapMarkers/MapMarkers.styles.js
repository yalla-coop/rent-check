import styled from 'styled-components';
import { useClassColor } from '../../constants/colors';

const PopupLabel = styled.div.attrs({
  className: 'b mb1',
})``;

const PopupInfo = styled.div.attrs({
  className: 'mb1',
})``;

const CenteredSection = styled.div.attrs({
  className: 'center w-90 tc bt bw1 pv3 mt3 ph2',
})``;

const Pill = styled.div.attrs({
  className: 'f6 br-pill ph3 pv2 mb2 dib black b  ml-auto mr-auto',
})`
  background: ${props => useClassColor[props.useClass]};
`;

const Button = styled.a.attrs({
  className:
    'f6 grow no-underline br-pill ph3 pv2 mv2 dib link white bg-hot-pink avenir button-reset b-none',
})`
  color: white !important;
`;

export { PopupInfo, PopupLabel, CenteredSection, Pill, Button };
