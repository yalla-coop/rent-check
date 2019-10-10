import User from '../../models/User';
import { roles, status } from '../../../../constants/users';

// gets all users
export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

// gets one user
export const getUser = id => {
  return User.findById(id);
};

// upates awaitingSuperUser status if rejected
export const rejectSuperUser = id =>
  User.findOneAndUpdate(
    { _id: id },
    { status: status.VERIFIED },
    { new: true }
  );

// updates awaitingSuperUser status if approved
export const approveSuperUser = (userId, adminId) =>
  User.findOneAndUpdate(
    { _id: userId },
    { role: roles.SUPERUSER, status: status.VERIFIED, grantedSuperBy: adminId },
    { new: true }
  );

// upates unverified status if rejected
export const rejectUser = id =>
  User.findOneAndUpdate(
    { _id: id },
    { status: status.REJECTED },
    { new: true }
  );

// updates unverified status if approved
export const approveUser = (userId, adminId) =>
  User.findOneAndUpdate(
    { _id: userId },
    { status: status.VERIFIED, verifiedBy: adminId },
    { new: true }
  );
