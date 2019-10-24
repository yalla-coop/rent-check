const User = require("../../models/User");

module.exports = async function getAllUsers() {
  return User.find();
};
