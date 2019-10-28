const User = require("../../models/User");
const { roles } = require("../../../constants/users");

module.exports = async function getAdminUserId() {
  return User.findOne({ role: roles.ADMIN }).select("_id");
};
