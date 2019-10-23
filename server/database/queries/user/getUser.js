const User = require("../../models/User");

module.exports = async function getUser(id) {
  return User.findById(id);
};
