import * as yup from 'yup';

import * as options from '../../constants/rentalRecords';

export default yup.object().shape({
  address: yup.string().required('Required field'),
  postcode: yup.string().required('Required field'),
  leaseLength: yup.string().required('Required field'),
  landlordTenantAct: yup
    .string()
    .oneOf(options.landlordTenantsActEnum, 'Select a value')
    .required(),

  doLastRentReview: yup.mixed().required('Required field'),
  doNextRentReview: yup.mixed().required('Required field'),

  landLordName: yup.string().required('Required field'),
  specifications: yup
    .string()
    .oneOf(options.specificationEnum, 'Select a value')
    .required('Required field'),
  annualRent: yup
    .number()
    .typeError('Must be a number')
    .required('Required field'),
  sqFt: yup
    .number()
    .typeError('Must be a number')
    .required('Required field'),
  priceSqFt: yup
    .number()
    .typeError('Must be a number')
    .required('Required field'),
  serviceCharge: yup
    .number()
    .typeError('Must be a number')
    .required('Required field'),
  useClass: yup
    .string()
    .oneOf(options.useClassEnum, 'Select a value')
    .required('Required field'),
  restricted: yup
    .string()
    .oneOf(options.restrictedEnum, 'Select a value')
    .required('Required field'),
  breakClauses: yup.string().required('Required field'),
  additionalComments: yup.string().required('Required field'),
});
