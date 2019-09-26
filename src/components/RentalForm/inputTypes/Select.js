import React from 'react';
import { Select as AntSelect } from 'antd';

const { Option } = AntSelect;

const Select = ({ options, name, handleChange, value }) => {
  return (
    <AntSelect value={value} onChange={v => handleChange(name, v)}>
      {!!options &&
        options.map(option => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
    </AntSelect>
  );
};

export default Select;
