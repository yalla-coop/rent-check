import React from "react";
import { Input } from "antd";

const TextArea = ({ name, handleChange, value }) => {
  return (
    <div style={{width: "100%"}}>
      <Input.TextArea
        style={{ width: "100%" }}
        rows={4}
        onChange={e => handleChange(name, e.target.value)}
        value={value}
      />
    </div>
  );
};

export default TextArea;
