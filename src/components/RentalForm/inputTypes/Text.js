import React from 'react';
import { Input } from 'antd';

const Text = ({ name, handleChange, value }) => {
  return (
    <Input value={value} onChange={e => handleChange(name, e.target.value)} />
  );
};

export default Text;
