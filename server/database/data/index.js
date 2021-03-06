const mongoose = require("mongoose");
const dbConnection = require("../dbConnection");
const resetDb = require("../resetDb");
const populateUsers = require("./users");
const populateRentalRecords = require("./rentalRecords");

// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();

const buildData = () =>
  dbConnection().then(async () => {
    try {
      await resetDb();
      await populateUsers();
      await populateRentalRecords();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("err during building the test db, try again", err);
      throw err;
    }
  });

if (process.env.NODE_ENV !== "test") {
  buildData()
    .then(async () => {
      // eslint-disable-next-line no-console
      console.log("Done!: Dev DB has been built successfully");
      // close the connection after build
      await mongoose.disconnect();
      process.exit(0);
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log("err", err);
    });
}

module.exports = buildData;
