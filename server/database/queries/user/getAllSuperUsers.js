const User = require("../../models/User");
const { roles } = require("../../../constants/users");

module.exports = async function getAllUsers() {
  return User.find({ role: roles.SUPERUSER });
};
