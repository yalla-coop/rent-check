const User = require("../../models/User");
const { status } = require("../../../constants/users");

module.exports = async function requestSuperUser(id) {
  return User.findOneAndUpdate(
    { _id: id },
    { status: status.AWAITING_SUPER },
    { new: true },
  );
};
