const connectToDatabase = require("../../../database/dbConnection");
const {
  approveSuperUser,
  rejectSuperUser,
  approveUser,
  rejectUser,
} = require("../../../database/queries/user");
const { status } = require("../../../constants/users");

module.exports = function updateUser(req, res) {
  res.send("user updated!");
};
