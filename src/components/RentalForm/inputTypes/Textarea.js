import React from 'react';
import { Input } from 'antd';

const TextArea = ({ name, handleChange, value }) => {
  return (
    <div>
      <Input.TextArea
        rows={4}
        onChange={e => handleChange(name, e.target.value)}
        value={value}
      />
    </div>
  );
};

export default TextArea;
