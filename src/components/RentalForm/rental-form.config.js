import * as O from '../../constants/rentalRecords';

const formLabels = () => {
  const data = [
    { label: 'Address', name: 'address', type: 'text', col: 1 },
    { label: 'Postcode', name: 'postcode', type: 'text', col: 1 },
    { label: 'Lease length', name: 'leaseLength', type: 'text', col: 1 },
    {
      label: 'Landlord Tenant Act',
      name: 'landlordTenantAct',
      type: 'select',
      col: 1,
      options: O.landlordTenantsActEnum,
    },
    {
      label: 'Date of Last rent review',
      name: 'doLastRentReview',
      type: 'date',
      col: 1,
    },
    {
      label: 'Date of next rent review',
      name: 'doNextRentReview',
      type: 'date',
      col: 1,
    },
    { label: 'Landlord name', name: 'landLordName', type: 'text', col: 1 },
    {
      label: 'Specification',
      name: 'specifications',
      type: 'select',
      col: 1,
      options: O.specificationEnum,
    },

    { label: 'Annual rent', name: 'annualRent', type: 'number', col: 2 },
    { label: 'Square feet', name: 'sqFt', type: 'number', col: 2 },
    { label: 'Price / sq. ft.', name: 'priceSqFt', type: 'number', col: 2 },
    { label: 'Service charge', name: 'serviceCharge', type: 'number', col: 2 },
    {
      label: 'Use class',
      name: 'useClass',
      type: 'select',
      col: 2,
      options: O.useClassEnum,
    },
    {
      label: 'Restricted',
      name: 'restricted',
      type: 'select',
      col: 2,
      options: O.restrictedEnum,
    },
    { label: 'Break clauses', name: 'breakClauses', type: 'text', col: 2 },

    {
      label: 'Additional Comments',
      name: 'additionalComments',
      type: 'textarea',
      col: 3,
    },
  ];
  return data;
};

export default formLabels;
