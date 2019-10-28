const User = require("../../models/User");
const { status } = require("../../../constants/users");

// updates unverified status if approved
module.exports = async function approveUser(userId, adminId) {
  return User.findOneAndUpdate(
    { _id: userId },
    { status: status.VERIFIED, verifiedBy: adminId },
    { new: true },
  );
};
