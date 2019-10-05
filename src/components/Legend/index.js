import React from 'react';
import {
  Circle,
  LegendUseclass,
  ClassListItems,
  AnimateCircle,
  UseText,
} from './Legend.styles';
import { useClassColor } from '../../constants/colors';
import { useClassEnum } from '../../constants/rentalRecords';

const createLegend = open => {
  if (open) {
    return useClassEnum.map(useClass => (
      <AnimateCircle color={useClassColor[useClass]}>
        <UseText>{useClass}</UseText>
      </AnimateCircle>
    ));
  }
  return (
    <Circle color="#ff80cc">
      <UseText>Key</UseText>
    </Circle>
  );
};

const Legend = ({ toggleLegend, legend }) => (
  <LegendUseclass onClick={toggleLegend}>
    <ClassListItems>{createLegend(legend)}</ClassListItems>
  </LegendUseclass>
);

export default Legend;
