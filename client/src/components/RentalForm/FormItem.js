import React from "react";
import { Row, Col } from "antd";
import { Label } from "./RentalForm.style";
import getInputComponent from "./inputTypes";

const FormItem = ({ label, type, ...formProps }) => {
  return (
    <Row
      type="flex"
      justify="space-between"
      align="middle"
      style={{ margin: "1.5rem 0" }}
    >
        
      <Col span={24}>
      <Label>{label}</Label>
        {getInputComponent(type)(formProps)}
        <div key={formProps.label} style={{ color: "red" }}>
          {formProps.error}
        </div>
      </Col>
    </Row>
  );
};

export default FormItem;
