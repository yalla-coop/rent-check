import React from 'react';
import moment from 'moment';
import { DatePicker as DatePickerAnt } from 'antd';

const DatePicker = ({ name, handleChange, value }) => {
  return (
    <DatePickerAnt
      onChange={_ => handleChange(name, _)}
      value={moment(value || Date.now())}
    />
  );
};

export default DatePicker;
