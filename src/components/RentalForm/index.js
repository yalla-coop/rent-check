import React from 'react';
import { Row, Col } from 'antd';

import FormItem from './FormItem';
import formData from './rental-form.config';
import { useForm } from '../../hooks/useForm';

const initValues = {};
formData().forEach(item => {
  initValues[item.name] = '';
});

const RentalForm = () => {
  const [values, handleChange] = useForm(initValues);

  return (
    <form style={{ width: '65%', margin: '0 auto' }}>
      <h2>Add Rental Data</h2>

      <Row type="flex" justify="space-between">
        <Col xs={24} sm={24} md={11} lg={11} xl={11}>
          {formData().map(({ col, ...rest }) => {
            if (col === 1) {
              return (
                <FormItem
                  key={rest.label}
                  {...rest}
                  handleChange={handleChange}
                  value={values[rest.name]}
                />
              );
            }
            return null;
          })}
        </Col>
        <Col xs={24} sm={24} md={11} lg={11} xl={11}>
          {formData().map(({ col, ...rest }) => {
            if (col === 2) {
              return (
                <FormItem
                  key={rest.label}
                  {...rest}
                  handleChange={handleChange}
                  value={values[rest.name]}
                />
              );
            }
            return null;
          })}
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
          {formData().map(({ col, ...rest }) => {
            if (col === 3) {
              return (
                <FormItem
                  key={rest.label}
                  {...rest}
                  handleChange={handleChange}
                  value={values[rest.name]}
                />
              );
            }
            return null;
          })}
        </Col>
      </Row>
    </form>
  );
};

export default RentalForm;
