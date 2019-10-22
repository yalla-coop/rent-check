const connectToDatabase = require("../../../database/dbConnection");
const {
  getUser,
  approveSuperUser,
  rejectSuperUser,
  approveUser,
  rejectUser,
  getAdminUserId
} = require("../../../database/queries/user");
const { status, roles } = require("../../../constants/users");

module.exports = async function updateUser(req, res) {
  // TODO replace with current logged in admin ID
  const adminIdPlaceholder = await getAdminUserId();

  const updatedUser = req.body;
  console.log("update", updatedUser);
  const previousUser = await getUser(updatedUser.user);
  console.log("previousUser", previousUser);

  const userVerified = (previous, updated) =>
    previous.role === roles.USER &&
    previous.status === status.UNVERIFIED &&
    updated.userStatus === status.VERIFIED;

  const userRejected = (previous, updated) =>
    previous.role === roles.USER &&
    previous.status === status.UNVERIFIED &&
    updated.userStatus === status.REJECTED;

  const superUserGranted = (previous, updated) =>
    previous.status === status.AWAITING_SUPER &&
    updated.userStatus === status.VERIFIED &&
    updated.role === roles.SUPERUSER;

  const superUserRejected = (previous, updated) =>
    previous.status === status.AWAITING_SUPER &&
    updated.userStatus === status.VERIFIED &&
    updated.role !== roles.SUPERUSER;

  const updateDatabase = async (query, args, msg) => {
    try {
      await query(...args);
      const updatedUserProfile = await getUser(updatedUser.user);
      res.send({ msg });
    } catch (err) {
      console.log("ERR", err);
      res.status(500).send("Server error");
    }
  };

  if (userRejected(previousUser, updatedUser)) {
    console.log("1");
    return updateDatabase(
      rejectUser,
      [updatedUser.user],
      "User has been rejected"
    );
  }
  if (userVerified(previousUser, updatedUser)) {
    console.log("2");
    return updateDatabase(
      approveUser,
      [updatedUser.user, adminIdPlaceholder],
      "User has been verified"
    );
  }
  if (superUserRejected(previousUser, updatedUser)) {
    console.log("3");
    return updateDatabase(
      rejectSuperUser,
      [updatedUser.user],
      "Request for Super User access has been rejected"
    );
  }
  if (superUserGranted(previousUser, updatedUser)) {
    console.log("4");
    return updateDatabase(
      approveSuperUser,
      [updatedUser.user, adminIdPlaceholder],
      "Request for Super User access granted"
    );
  }
  res
    .status(400)
    .send(
      "There was a problem with the data submitted, please check and try again."
    );
};
