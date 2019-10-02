import User from '../../models/User';

export const getAllUsers = async () => User.find();
