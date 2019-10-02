import * as yup from 'yup';

import * as options from '../../constants/rentalRecords';

yup.addMethod(yup.mixed, 'defined', function() {
  return this.test(
    'defined',
    '{path} must be defined',
    value => value !== undefined || value !== null
  );
});

export default yup.object().shape({
  address: yup.string().required('Required'),
  postcode: yup.string().required('Required'),
  leaseLength: yup.string().required('Required'),
  landlordTenantAct: yup
    .string()
    .oneOf(options.landlordTenantsActEnum, 'Select a value')
    .required(),

  doLastRentReview: yup.mixed().required('Required'),
  doNextRentReview: yup.mixed().required('Required'),

  landLordName: yup.string(),
  specifications: yup
    .string()
    .oneOf(options.specificationEnum, 'Select a value')
    .required('Required'),
  annualRent: yup
    .number()
    .typeError('Must be a number')
    .required('Required'),
  sqFt: yup
    .number()
    .typeError('Must be a number')
    .required('Required'),

  priceSqFt: yup
    .number()
    .typeError('Must be a number')
    .required('Required'),
  serviceCharge: yup.number().nullable(),

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
