import * as yup from 'yup';

import * as options from '../../constants/rentalRecords';

export default yup.object().shape({
  address: yup.string().required('Required'),
  postcode: yup
    .string()
    .matches(
      /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/,
      'Invalid postcode'
    )
    .required('Required'),
  leaseLength: yup.string().required('Required'),
  landlordTenantsAct: yup
    .string()
    .oneOf(options.landlordTenantsActEnum, 'Select a value')
    .required(),

  lastRentReview: yup.mixed().required('Required'),
  nextRentReview: yup.mixed().required('Required'),

  landlord: yup.string(),
  specification: yup
    .string()
    .oneOf(options.specificationEnum, 'Select a value')
    .required('Required'),
  annualRent: yup
    .number()
    .typeError('Must be a number')
    .required('Required'),
  squareFeet: yup
    .number()
    .typeError('Must be a number')
    .required('Required'),

  priceSqFt: yup
    .number()
    .typeError('Must be a number')
    .required('Required'),

  yardSquareFeet: yup
    .number()
    .typeError('Must be a number')
    .nullable(),
  yardPriceSqFt: yup
    .number()
    .typeError('Must be a number')
    .nullable(),

  serviceCharge: yup
    .number()
    .typeError('Must be a number')
    .nullable(),

  useClass: yup
    .string()
    .oneOf(options.useClassEnum, 'Select a value')
    .required('Required'),
  restricted: yup
    .string()
    .oneOf(options.restrictedEnum, 'Select a value')
    .required('Required'),
  breakClauses: yup.string(),
  additionalComments: yup.string(),
});
