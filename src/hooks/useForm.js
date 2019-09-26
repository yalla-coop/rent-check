import { useState } from 'react';

export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);
  return [
    values,
    (fieldName, value) => {
      setValues({
        ...values,
        [fieldName]: value,
      });
    },
  ];
};
