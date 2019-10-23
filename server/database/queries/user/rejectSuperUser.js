const User = require("../../models/User");
const { roles, status } = require("../../../constants/users");

module.exports = async function rejectSuperUser(id) {
  return User.findOneAndUpdate(
    { _id: id },
    { status: status.VERIFIED },
    { new: true }
  );
};
