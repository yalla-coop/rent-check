const RentalRecord = require("../../models/RentalRecord");

module.exports = async function getRentalRecordsByUserId(id) {
  return RentalRecord.find({ submittedBy: id });
};
