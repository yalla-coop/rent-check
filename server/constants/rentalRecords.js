const status = {
  INVALID: "invalid",
  UNVERIFIED: "unverified",
  VERIFIED: "verified",
  REJECTED: "rejected",
};

const statusEnum = Object.values(status);

const landlordTenantsActEnum = ["Yes", "No", "Not sure"];
const specificationEnum = ["Refurbished", "Shell", "Other / Not sure"];
const useClassEnum = ["A1", "A3", "B1", "B2", "B8", "D1", "D2", "Other"];
const restrictedEnum = ["Restricted", "Unrestricted", "Not sure"];

module.exports = {
  status,
  statusEnum,
  landlordTenantsActEnum,
  specificationEnum,
  useClassEnum,
  restrictedEnum,
};
