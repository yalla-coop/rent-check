const RentalRecord = require("../../models/RentalRecord");

module.exports = async function deleteUserRecords(userId) {
  return RentalRecord.deleteMany({ submittedBy: userId });
};
