import User from '../../models/User';
import { roles, status } from '../../../../constants/users';

// gets all users
export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

// upates awaitingSuperUser status if rejected
export const rejectSuperUser = id =>
  User.findOneAndUpdate(
    { _id: id },
    { status: status.VERIFIED },
    { new: true }
  );

// updates awaitingSuperUser status if approved
export const approveSuperUser = id =>
  User.findOneAndUpdate(
    { _id: id },
    { role: roles.SUPERUSER, status: status.VERIFIED, grantedSuperBy: id },
    { new: true }
  );
