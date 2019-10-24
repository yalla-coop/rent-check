const User = require("../../models/User");

module.exports = async function deleteUser(id) {
  return User.deleteOne({ _id: id });
};
