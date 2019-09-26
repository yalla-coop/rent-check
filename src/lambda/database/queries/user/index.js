import User from '../../models/User';

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};
