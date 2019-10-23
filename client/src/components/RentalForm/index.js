import React from 'react';
import moment from 'moment';
import { Row, Col } from 'antd';
import axios from 'axios';

import FormItem from './FormItem';
import formData from './rental-form.config';
import useForm from '../../hooks/useForm';
import validationSchema from './rentalForm.validation';

import * as S from './RentalForm.style';

import Button from '../Common/Button';

const initValues = {};
formData().forEach(item => {
  if (item.type === 'date') {
    initValues[item.name] = null;
  } else if (item.type === 'number') {
    initValues[item.name] = undefined;
  } else {
    initValues[item.name] = '';
  }
});

const RentalForm = () => {
  const onSubmitForm = state => {
    return axios.post('/api/locations', state);
  };

  const {
    state: values,
    errors,
    handleOnChange: handleChange,
    handleOnSubmit,
    isSubmitting,
  } = useForm(initValues, validationSchema, onSubmitForm);

  const disabledStartDate = startValue => {
    const { doNextRentReview: endValue } = values;
    // false mean not disabled
    if (!startValue || !endValue) {
      return false;
    }

    return startValue.valueOf() > endValue.valueOf();
  };

  const disabledEndDate = endValue => {
    const { doLastRentReview: startValue } = values;
    if (!endValue || !startValue) {
      return false;
    }
    return (
      endValue.valueOf() <= startValue.valueOf() ||
      (endValue && endValue < moment().subtract(1, 'day'))
    );
  };

  const renderCol = num => {
    return formData().map(({ col, ...rest }) => {
      if (col === num) {
        return (
          <FormItem
            key={rest.label}
            {...rest}
            handleChange={handleChange}
            disabledStartDate={disabledStartDate}
            disabledEndDate={disabledEndDate}
            value={values[rest.name]}
            error={errors[rest.name]}
          />
        );
      }
      return null;
    });
  };

  return (
    <S.Form onSubmit={handleOnSubmit}>
      <h2>Add Rental Data</h2>

      <Row type="flex" justify="space-between">
        <Col xs={24} sm={24} md={11} lg={11} xl={11}>
          {renderCol(1)}
        </Col>
        <Col xs={24} sm={24} md={11} lg={11} xl={11}>
          {renderCol(2)}
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col xs={24} sm={24} md={20} lg={20} xl={20}>
          {renderCol(3)}
        </Col>
      </Row>

      <Button
        type="primary"
        text="Submit"
        loading={isSubmitting}
        style={{ margin: '0 auto' }}
      />
    </S.Form>
  );
};

export default RentalForm;
