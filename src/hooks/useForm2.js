import { useState, useEffect, useCallback } from 'react';
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
  const [attemptedToSumbit, setAttemptedToSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  // Disable button in initial render.
  useEffect(() => {
    setCanSubmit(false);
  }, []);

  // TODO: consider using useCallback for performance optimization
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const validateField = (fieldName, value) => {
    if (
      !(fieldName !== 'doLastRentReview' || fieldName !== 'doNextRentReview')
    ) {
      return yup.reach(validationSchema, fieldName).validate(value);
    }
  };

  const validateState = useCallback(async (fieldName, value) => {
    try {
      if (fieldName) {
        console.log('dslkfj', fieldName, value);
        if (
          !(
            fieldName !== 'doLastRentReview' || fieldName !== 'doNextRentReview'
          )
        ) {
          const x = await yup
            .reach(validationSchema, fieldName)
            .validate(value);
          console.log('x', x);
        }
      } else {
        await validationSchema.validate(state, { abortEarly: false });
        setErrors({});
      }
      const remainingErrors = {
        ...errors,
        [fieldName]: '',
      };
      setErrors(remainingErrors);
      setCanSubmit(true);
      setAttemptedToSubmit(false);
    } catch (errs) {
      setCanSubmit(false);
      console.log('errs', errs);
      if (!errs.inner.length) {
        const newErrs = {
          ...errors,
          [fieldName]: errs.message,
        };
        setErrors(newErrs);
      } else {
        const errorsObj = {};
        errs.inner.forEach(err => {
          const field = err.path.split('.')[0];
          errorsObj[field] = err.message;
        });
        setErrors(errorsObj);
        setAttemptedToSubmit(false);
      }
    }
  });

  // Event handler for handling changes in input.
  const handleOnChange = (fieldName, value) => {
    validateState(fieldName, value);
    setState({
      ...state,
      [fieldName]: value,
    });
  };

  const errorsLength = Object.keys(errors).length;

  useEffect(() => {
    if (attemptedToSumbit) {
      validateState();
    }
  }, [errorsLength, attemptedToSumbit, state, validateState, errors]);

  // eslint-disable-next-line
  const handleOnSubmit = event => {
    event.preventDefault();
    setAttemptedToSubmit(true);
    validateState();
    console.log('cansubmit', canSubmit);
    console.log('errors', errors);
    console.log('Object.keys(errors).length', Object.keys(errors).length);
    console.log(Object.values(errors));
    const hasErrors = Object.values(errors).some(item => !!item);
    console.log('hasErrors', hasErrors);
    if (!hasErrors && canSubmit) {
      console.log('submitted');
      callback(state);
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
