const RentalRecord = require("../../models/RentalRecord");

module.exports = async function getAllRentalRecords() {
  return RentalRecord.find();
};
