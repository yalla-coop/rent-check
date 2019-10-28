import React from "react";
import Select from "./Select";
import Text from "./Text";
import Textarea from "./Textarea";
import DatePicker from "./DatePicker";
import InputNumber from "./NumberInput";

const getInputComponent = type => {
  return {
    text: props => <Text {...props} />,
    date: props => <DatePicker {...props} />,
    number: props => <InputNumber {...props} />,
    textarea: props => <Textarea {...props} />,
    select: props => <Select {...props} />,
  }[type];
};

export default getInputComponent;
