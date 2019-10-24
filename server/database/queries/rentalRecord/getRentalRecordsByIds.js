const RentalRecord = require("../../models/RentalRecord");

module.exports = function getRentalRecordsByIds(ids) {
  return RentalRecord.find({ submittedBy: { $in: ids } });
};
