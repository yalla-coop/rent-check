const resetDb = require("../resetDb");
const populateUsers = require("./users");
const populateRentalRecords = require("./rentalRecords");

module.exports = async function buildData() {
  try {
    await resetDb();
    await populateUsers();
    await populateRentalRecords();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("err during building the test db, try again", err);
    throw err;
  }
};
