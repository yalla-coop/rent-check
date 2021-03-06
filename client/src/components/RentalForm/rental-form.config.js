import * as O from "../../constants/rentalRecords";

const formLabels = () => {
  const data = [
    {
      label: "Address",
      name: "address",
      placeholder: "Enter your address",
      type: "text",
      col: 1,
    },
    {
      label: "Postcode",
      name: "postcode",
      placeholder: "postecode",
      type: "text",
      col: 1,
    },
    {
      label: "Lease length",
      name: "leaseLength",
      placeholder: "E.g. 30 months or 5 years",
      type: "text",
      col: 1,
    },
    {
      label: "Landlord Tenant Act",
      name: "landlordTenantsAct",
      placeholder: "Select a value",
      type: "select",
      col: 1,
      options: O.landlordTenantsActEnum,
    },
    {
      label: "Date of Last rent review",
      name: "lastRentReview",
      placeholder: "Last review date",
      type: "date",
      col: 1,
    },
    {
      label: "Date of next rent review",
      name: "nextRentReview",
      placeholder: "Next review date",
      type: "date",
      col: 1,
    },
    {
      label: "Landlord name",
      name: "landlord",
      placeholder: "",
      type: "text",
      col: 1,
    },
    {
      label: "Specification",
      name: "specification",
      placeholder: "select a value",
      type: "select",
      col: 1,
      options: O.specificationEnum,
    },

    {
      label: "Annual rent",
      name: "annualRent",
      placeholder: "£",
      type: "number",
      col: 2,
    },
    {
      label: "Square feet",
      name: "squareFeet",
      placeholder: "Sq. Ft.",
      type: "number",
      col: 2,
    },
    {
      label: "Price / sq. ft.",
      name: "priceSqFt",
      placeholder: "£",
      type: "number",
      col: 2,
    },

    {
      label: "Yard SqFt",
      name: "yardSquareFeet",
      placeholder: "Yard SqFt",
      type: "number",
      col: 2,
    },
    {
      label: "Yard Price SqFt",
      name: "yardPriceSqFt",
      placeholder: "Yard Price SqFt",
      type: "number",
      col: 2,
    },
    {
      label: "Service charge",
      name: "serviceCharge",
      placeholder: "£",
      type: "number",
      col: 2,
    },
    {
      label: "Use class",
      name: "useClass",
      placeholder: "Select a value",
      type: "select",
      col: 2,
      options: O.useClassEnum,
    },
    {
      label: "Restricted",
      name: "restricted",
      placeholder: "Select a value",
      type: "select",
      col: 2,
      options: O.restrictedEnum,
    },
    {
      label: "Break clauses",
      name: "breakClauses",
      placeholder: "Select a value",
      type: "text",
      col: 2,
    },

    {
      label: "Additional Comments",
      name: "additionalComments",
      placeholder: "Comment here",
      type: "textarea",
      col: 3,
    },
  ];
  return data;
};

export default formLabels;
