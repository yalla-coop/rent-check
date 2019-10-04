import User from '../../models/User';

export const getAllUsers = async () => User.find();

export const deleteUser = id => User.deleteOne({ _id: id });
