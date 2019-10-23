const User = require("../../models/User");

const getAllUsers = require("./getAllUsers");
const getAllSuperUsers = require("./getAllSuperUsers");
const getUser = require("./getUser");
const getAdminUserId = require("./getAdminUserId");
const rejectSuperUser = require("./rejectSuperUser");
const approveSuperUser = require("./approveSuperUser");
const rejectUser = require("./rejectUser");
const approveUser = require("./approveUser");

module.exports = {
  getAllUsers,
  getAllSuperUsers,
  getUser,
  getAdminUserId,
  rejectSuperUser,
  approveSuperUser,
  rejectUser,
  approveUser,
};
