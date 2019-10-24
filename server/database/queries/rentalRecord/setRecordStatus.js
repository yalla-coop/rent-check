const RentalRecord = require("../../models/RentalRecord");

module.exports = async function setRecordStatus(id, newStatus) {
  return RentalRecord.findByIdAndUpdate(id, newStatus, { new: true });
};
