/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import * as yup from "yup";
import { message } from "antd";

import { useHistory } from "react-router";

message.config({
  top: 100,
});

/**
 * Custom hooks to validate your Form...
 *
 * @param {object} stateSchema model you stateSchema.
 * @param {object} validationSchema model your validation.
 * @param {function} callback function to be execute during form submission.
 */
function useForm2(stateSchema = {}, validationSchema = {}, callback) {
  const [state, setState] = useState(stateSchema);
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();

  // TODO: consider using useCallback for performance optimization
  const validateField = (fieldName, value) => {
    return yup.reach(validationSchema, fieldName, state).validate(value);
  };

  const validateState = () => {
    return validationSchema.validate(state, { abortEarly: false });
  };

  // Event handler for handling changes in input.
  const handleOnChange = async (fieldName, value) => {
    try {
      setState({
        ...state,
        [fieldName]: value,
      });
      await validateField(fieldName, value);
      const newErrs = {
        ...errors,
        [fieldName]: "",
      };
      setErrors(newErrs);
      setCanSubmit(true);
    } catch (errs) {
      setCanSubmit(false);
      const newErrs = {
        ...errors,
        [fieldName]: errs.message,
      };
      setErrors(newErrs);
    }
  };

  const handleOnSubmit = async event => {
    setIsSubmitting(true);
    event.preventDefault();
    try {
      await validateState();
      const hasErrors = Object.values(errors).some(item => !!item);
      setCanSubmit(true);
      if (!hasErrors && canSubmit) {
        try {
          await callback(state);
          setIsSubmitting(false);
          // TODO: render different message if the user is the Admin
          message.success(
            "Data will need to be verified by your street rep",
            5,
            () => {
              history.push("/");
            }
          );
          setState({});
        } catch (error) {
          message.error("Something went wrong try again later", 5, () => {
            history.push("/");
          });
          setIsSubmitting(false);
          setState({});
        }
      }
    } catch (errs) {
      setIsSubmitting(false);
      const errorsObj = {};
      errs.inner.forEach(err => {
        const field = err.path.split(".")[0];
        errorsObj[field] = err.message;
      });
      setErrors(errorsObj);
    }
  };

  return {
    handleOnChange,
    handleOnSubmit,
    state,
    errors,
    isSubmitting,
  };
}

export default useForm2;
