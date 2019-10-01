import React from 'react';
import { DatePicker as DatePickerAnt } from 'antd';

const DatePicker = ({
  name,
  handleChange,
  disabledStartDate,
  disabledEndDate,
  value,
  placeholder,
}) => {
  return (
    <DatePickerAnt
      onChange={v => handleChange(name, v)}
      disabledDate={
        name === 'doLastRentReview' ? disabledStartDate : disabledEndDate
      }
      value={value}
      format="YYYY-MM-DD"
      placeholder={placeholder}
    />
  );
};

export default DatePicker;
