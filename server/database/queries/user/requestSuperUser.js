const User = require("../../models/User");
const { status, roles } = require("../../../constants/users");

module.exports = async function requestSuperUser(id) {
  const userToUpdate = await User.findOne({ _id: id });
  if (
    userToUpdate.status === status.VERIFIED &&
    userToUpdate.role === roles.USER
  ) {
    return User.findOneAndUpdate(
      { _id: id },
      { status: status.AWAITING_SUPER },
      { new: true }
    );
  } else throw new Error("User cannot request super user status");
};
