const RentalRecord = require("../../models/RentalRecord");

module.exports = async function deleteSingleRecord(id) {
  return RentalRecord.deleteOne({ _id: id });
};
