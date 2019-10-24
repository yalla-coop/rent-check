const User = require("../../models/User");
const { roles, status } = require("../../../constants/users");

module.exports = async function rejectUser(id) {
  return User.findOneAndUpdate(
    { _id: id },
    { status: status.REJECTED },
    { new: true }
  );
};
