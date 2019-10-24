const User = require("../../models/User");
const { roles, status } = require("../../../constants/users");

// updates awaitingSuperUser status if approved
module.exports = async function approveSuperUser(userId, adminId) {
  return User.findOneAndUpdate(
    { _id: userId },
    { role: roles.SUPERUSER, status: status.VERIFIED, grantedSuperBy: adminId },
    { new: true },
  );
};
