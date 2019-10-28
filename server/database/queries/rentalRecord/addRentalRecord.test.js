/**
 * @jest-environment node
 */

const buildData = require("../../data/index");

// import the query to test
const { addRentalRecord } = require("./index");

// import db models
const User = require("../../models/User");

// import constants
const rentalRecordsConst = require("../../../constants/rentalRecords");
const usersConst = require("../../../constants/users");

const { roles } = usersConst;
const userStatus = usersConst.status;

describe("addRentalRecords adds a valid record", () => {
  beforeAll(async done => {
    // connect and build dummy data
    await buildData();
    done();
  });

  test("should get an array of rental records without attached user data", async done => {
    // get our users to create the data
    const superUser = await User.findOne({ role: roles.SUPERUSER });
    const user = await User.findOne({
      role: roles.USER,
      status: userStatus.VERIFIED,
    });
    const record = {
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
    };
    await addRentalRecord(record);
    done();
  });
});
