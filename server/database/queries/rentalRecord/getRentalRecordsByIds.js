const RentalRecord = require("../../models/RentalRecord");

module.exports = function getSuperUserSubUsers(ids) {
  return RentalRecord.find({ submittedBy: { $in: ids } });
};
