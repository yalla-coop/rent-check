/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import * as yup from 'yup';

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
        [fieldName]: '',
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
    event.preventDefault();
    try {
      await validateState();
      const hasErrors = Object.values(errors).some(item => !!item);
      setCanSubmit(true);
      if (!hasErrors && canSubmit) {
        callback(state);
      }
    } catch (errs) {
      const errorsObj = {};
      errs.inner.forEach(err => {
        const field = err.path.split('.')[0];
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
  };
}

export default useForm2;
