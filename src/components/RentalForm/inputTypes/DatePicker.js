import React from 'react';
import moment from 'moment';
import { DatePicker as DatePickerAnt } from 'antd';

const DatePicker = ({
  name,
  handleChange,
  disabledStartDate,
  disabledEndDate,
  value,
}) => {
  console.log('value', value);
  return (
    <DatePickerAnt
      onChange={v => handleChange(name, v)}
      disabledDate={
        name === 'doLastRentReview' ? disabledStartDate : disabledEndDate
      }
      value={value}
      format="YYYY-MM-DD"
      placeholder="Start Date"
    />
  );
};

export default DatePicker;
