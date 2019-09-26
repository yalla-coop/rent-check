import User from '../../models/User';

// gets all users
export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

// upates awaitingSuperUser status if rejected
export const rejectSuperUser = id =>
  User.findOneAndUpdate({ _id: id }, { status: 'verified' }, { new: true });

// updates awaitingSuperUser status if approved
