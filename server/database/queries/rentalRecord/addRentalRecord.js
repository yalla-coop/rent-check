const RentalRecord = require("../../models/RentalRecord");

module.exports = async function addRentalRecord(record) {
  return RentalRecord.create(record);
};
