import React from 'react';
import { Row, Col } from 'antd';
import { Label } from './RentalForm.style';
import getInputComponent from './inputTypes';

const FormItem = ({ label, type, ...formProps }) => {
  return (
    <Row
      type="flex"
      justify="space-between"
      align="middle"
      style={{ margin: '10px 0' }}
    >
      <Col span={7}>
        <Label>{label}</Label>
      </Col>
      <Col span={16}>{getInputComponent(type)(formProps)}</Col>
    </Row>
  );
};

export default FormItem;
