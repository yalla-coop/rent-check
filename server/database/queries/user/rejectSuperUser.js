const User = require("../../models/User");
const { status, roles } = require("../../../constants/users");

module.exports = async function rejectSuperUser(id) {
  return User.findOneAndUpdate(
    { _id: id },
    { status: status.VERIFIED, role: roles.USER },
    { new: true },
  );
};
