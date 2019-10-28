import React from "react";
import moment from "moment";
import { Row, Col, Collapse } from "antd";
import axios from "axios";
import FormItem from "./FormItem";
import formData from "./rental-form.config";
import useForm from "../../hooks/useForm";
import validationSchema from "./rentalForm.validation";

import * as S from "./RentalForm.style";

import Button from "../Common/Button";

const { Panel } = Collapse;

const initValues = {};
formData().forEach(item => {
  if (item.type === "date") {
    initValues[item.name] = null;
  } else if (item.type === "number") {
    initValues[item.name] = undefined;
  } else {
    initValues[item.name] = "";
  }
});

const RentalForm = () => {
  const onSubmitForm = state => {
    return axios.post("/api/locations", state);
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
      (endValue && endValue < moment().subtract(1, "day"))
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
      <h2 className="f2 mt5">Add Your Data</h2>
      <p>Together we are stronger! Add your data to help other tenants with their rent reviews and landlord negotiations.</p>
      <Collapse accordion>
        <Panel header="How we use your data" key="1">
          <p>The information you give us will be stored in a database, and will be used only for the purposes of sharing data via this application. We will never share your data with any third party by any other means.</p>
          <p>Members will be able to see the information you provide, but will not be able to see your name or business name. If you do not wish to provide your exact address, you can enter just the street name. The postcode of your business is used to set the location of the icon on the map, and will be displayed in the popup information box.</p>
          <p>Street Reps will be able to see this information, plus your name and company name. This is necessary so that they can check and verify the information (for example by speaking with you in person) before they add the information to the map for members to view. Our Street Reps have agreed to treat other members' data as strictly confidential.</p>
          <p>If you have any further questions or concerns, please speak to a Street Rep near you</p>
        </Panel>
      </Collapse>
      <Row type="flex" justify="space-between">
        <Col xs={24} sm={24} md={11} lg={11} xl={11}>
          {renderCol(1)}
        </Col>
        <Col xs={24} sm={24} md={11} lg={11} xl={11}>
          {renderCol(2)}
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          {renderCol(3)}
        </Col>
      </Row>

      <Button
        type="primary"
        text="Submit"
        loading={isSubmitting}
        style={{ margin: "0 auto" }}
      />
    </S.Form>
  );
};

export default RentalForm;
