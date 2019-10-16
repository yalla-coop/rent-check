const RentalRecord = require("../models/RentalRecord");
const User = require("../models/User");

// import constants
const rentalRecordsConst = require("../../constants/rentalRecords");
const usersConst = require("../../constants/users");
const roles = usersConst.roles;
const userStatus = usersConst.status;

module.exports = async function populateRentalRecords() {
  // get our users to create the data
  const superUser = await User.findOne({ role: roles.SUPERUSER });
  const admin = await User.findOne({ role: roles.ADMIN });
  const user = await User.findOne({
    role: roles.USER,
    status: userStatus.VERIFIED,
  });

  const rentalRecords = [
    // reviewed data by superUser
    {
      submittedBy: user._id,
      reviewedBy: superUser._id,
      geoLocation: {
        coordinates: [-0.059245, 51.532572],
      },
      status: rentalRecordsConst.status.VERIFIED,
      address: "The Oval",
      postcode: "E2 9DT",
      leaseLength: "10 years",
      landlordTenantsAct: rentalRecordsConst.landlordTenantsAct.NO,
      lastRentReview: "1/1/2017",
      nextRentReview: "1/1/2022",
      annualRent: 61000,
      squareFeet: 4500.0,
      priceSqFt: 13.55,
      useClass: rentalRecordsConst.useClass.B2,
      restricted: rentalRecordsConst.restricted.NOT_SURE,
      specification: rentalRecordsConst.specification.REFURBISHED,
      breakClauses: "Half way through the lease in 2017",
    },
    // reviewed data by admin
    {
      submittedBy: superUser._id,
      reviewedBy: admin._id,
      geoLocation: {
        coordinates: [-0.069213, 51.529335],
      },
      status: rentalRecordsConst.status.VERIFIED,
      address: "95 Columbia Road",
      postcode: "E2 7RG",
      leaseLength: "60 Months",
      landlordTenantsAct: rentalRecordsConst.landlordTenantsAct.YES,
      lastRentReview: "2/1/2017",
      nextRentReview: "2/1/2019",
      annualRent: 27000,
      squareFeet: 550,
      priceSqFt: 49,
      serviceCharge: 50,
      useClass: rentalRecordsConst.useClass.A1,
      specification: rentalRecordsConst.specification.NOT_SURE,
      restricted: rentalRecordsConst.restricted.NOT_SURE,
      breakClauses: "3 years",
      landlord: "Carol Smith",
      additionalComments:
        "Property used as Ladies Hairdressers or the swale of such other goods as the landlord may approve such approval not to be unreasonably withheld",
    },
    // not yet reviewed
    {
      submittedBy: user._id,
      geoLocation: {
        coordinates: [-0.026635, 51.527098],
      },
      status: rentalRecordsConst.status.UNVERIFIED,
      address: "57 Bow Road, London",
      postcode: "E3 2AD",
      leaseLength: "20 years",
      landlordTenantsAct: rentalRecordsConst.landlordTenantsAct.YES,
      lastRentReview: "11/19/2014",
      nextRentReview: "11/19/2019",
      annualRent: 8000,
      squareFeet: 815.9,
      priceSqFt: 9.81,
      serviceCharge: 50,
      useClass: rentalRecordsConst.useClass.A1,
      specification: rentalRecordsConst.specification.NOT_SURE,
      restricted: rentalRecordsConst.restricted.RESTRICTED,
      breakClauses: "None",
      landlord:
        "The Mayor and Burgesses of the London Borough of Tower Hamlets",
      additionalComments:
        "Tenant holding over.  Lease expired 22/08/2017. renewal discussion currently on going.",
    },
    // rejected
    {
      submittedBy: user._id,
      reviewedBy: superUser._id,
      geoLocation: {
        coordinates: [-0.024634, 51.5097],
      },
      status: rentalRecordsConst.status.REJECTED,
      address: "1 Pennyfields, London",
      postcode: "E14 8HP",
      leaseLength: "10 years",
      landlordTenantsAct: rentalRecordsConst.landlordTenantsAct.YES,
      lastRentReview: "8/23/2012",
      nextRentReview: "8/23/2017",
      annualRent: 9500,
      squareFeet: 461,
      priceSqFt: 20.6,
      serviceCharge: 50,
      useClass: rentalRecordsConst.useClass.A1,
      specification: rentalRecordsConst.specification.NOT_SURE,
      restricted: rentalRecordsConst.restricted.RESTRICTED,
      breakClauses: "None",
      landlord:
        "The Mayor and Burgesses of the London Borough of Tower Hamlets",
    },
  ];

  return RentalRecord.create(rentalRecords);
};
