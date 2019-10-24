const User = require("../../models/User");

const getAllUsers = require("./getAllUsers");
const getUser = require("./getUser");
const getAdminUserId = require("./getAdminUserId");
const rejectSuperUser = require("./rejectSuperUser");
const approveSuperUser = require("./approveSuperUser");
const rejectUser = require("./rejectUser");
const approveUser = require("./approveUser");

// delete user
const deleteUser = id => User.deleteOne({ _id: id });

module.exports = {
  getAllUsers,
  getUser,
  getAdminUserId,
  rejectSuperUser,
  approveSuperUser,
  rejectUser,
  approveUser,
  deleteUser
};
