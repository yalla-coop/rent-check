const User = require('../../models/User');
const { roles } = require('../../../constants/users');

module.exports = async function revokeSuperUser(id) {
  return User.findOneAndUpdate(
    { _id: id },
    { role: roles.USER },
    { new: true }
  );
};
