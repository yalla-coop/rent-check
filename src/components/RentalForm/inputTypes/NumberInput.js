import React from 'react';
import { InputNumber as InputNumberAnt } from 'antd';

const InputNumber = ({ name, handleChange, value }) => {
  return (
    <InputNumberAnt
      min={1}
      max={10}
      defaultValue={1}
      onChange={v => handleChange(name, v)}
      value={value}
    />
  );
};

export default InputNumber;
