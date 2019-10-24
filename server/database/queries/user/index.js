const User = require("../../models/User");

const getAllUsers = require("./getAllUsers");
const getAllSuperUsers = require("./getAllSuperUsers");
const getUser = require("./getUser");
const getAdminUserId = require("./getAdminUserId");
const requestSuperUser = require("./requestSuperUser");
const rejectSuperUser = require("./rejectSuperUser");
const approveSuperUser = require("./approveSuperUser");
const rejectUser = require("./rejectUser");
const approveUser = require("./approveUser");
const deleteUser = require("./deleteUser");

module.exports = {
  getAllUsers,
  getAllSuperUsers,
  getUser,
  getAdminUserId,
  requestSuperUser,
  rejectSuperUser,
  approveSuperUser,
  rejectUser,
  approveUser,
  deleteUser
};
