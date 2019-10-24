import React from "react";
import { InputNumber as InputNumberAnt } from "antd";

const InputNumber = ({ name, handleChange, value }) => {
  return (
    <InputNumberAnt
      style={{ width: "100%" }}
      min={0}
      defaultValue={0}
      onChange={v => handleChange(name, v)}
      value={value}
    />
  );
};

export default InputNumber;
