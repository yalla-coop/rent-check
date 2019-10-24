const User = require("../../models/User");

module.exports = function getSuperUserSubUsers(superUserId) {
  return User.find({ verifiedBy: superUserId }).distinct("_id");
};
