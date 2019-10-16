const User = require("../../models/User");
const { roles, status } = require("../../../constants/users");

// gets all users
const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

// gets one user
const getUser = id => {
  return User.findById(id);
};

const getAdminUserId = () => User.findOne({ role: roles.ADMIN }).select("_id");

// upates awaitingSuperUser status if rejected
const rejectSuperUser = id =>
  User.findOneAndUpdate(
    { _id: id },
    { status: status.VERIFIED },
    { new: true }
  );

// updates awaitingSuperUser status if approved
const approveSuperUser = (userId, adminId) =>
  User.findOneAndUpdate(
    { _id: userId },
    { role: roles.SUPERUSER, status: status.VERIFIED, grantedSuperBy: adminId },
    { new: true }
  );

// upates unverified status if rejected
const rejectUser = id =>
  User.findOneAndUpdate(
    { _id: id },
    { status: status.REJECTED },
    { new: true }
  );

// updates unverified status if approved
const approveUser = (userId, adminId) =>
  User.findOneAndUpdate(
    { _id: userId },
    { status: status.VERIFIED, verifiedBy: adminId },
    { new: true }
  );

module.exports = {
  getAllUsers,
  getUser,
  getAdminUserId,
  rejectSuperUser,
  approveSuperUser,
  rejectUser,
  approveUser,
};
