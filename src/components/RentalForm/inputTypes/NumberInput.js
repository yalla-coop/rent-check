import React from 'react';
import { InputNumber as InputNumberAnt } from 'antd';

const InputNumber = ({ name, handleChange, value }) => {
  return (
    <InputNumberAnt
      style={{ width: '100%' }}
      min={1}
      defaultValue={1}
      onChange={v => handleChange(name, v)}
      value={value}
    />
  );
};

export default InputNumber;
