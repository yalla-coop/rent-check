const status = {
  INVALID: "invalid",
  UNVERIFIED: "unverified",
  VERIFIED: "verified",
  REJECTED: "rejected",
};

const statusEnum = Object.values(status);

const landlordTenantsAct = {
  YES: "Yes",
  NO: "No",
  NOT_SURE: "Not sure",
};

const landlordTenantsActEnum = Object.values(landlordTenantsAct);

const specification = {
  REFURBISHED: "Refurbished",
  SHELL: "Shell",
  NOT_SURE: "Other / Not sure",
};
const specificationEnum = Object.values(specification);

const useClass = {
  A1: "A1",
  A3: "A3",
  B1: "B1",
  B2: "B2",
  B8: "B8",
  D1: "D1",
  D2: "D2",
  OTHER: "Other",
};
const useClassEnum = Object.values(useClass);

const restricted = {
  RESTRICTED: "Restricted",
  UNRESTRICTED: "Unrestricted",
  NOT_SURE: "Not sure",
};

const restrictedEnum = Object.values(restricted);

module.exports = {
  status,
  statusEnum,
  landlordTenantsAct,
  landlordTenantsActEnum,
  specification,
  specificationEnum,
  useClass,
  useClassEnum,
  restricted,
  restrictedEnum,
};
