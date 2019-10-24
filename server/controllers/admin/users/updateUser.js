const connectToDatabase = require("../../../database/dbConnection");
const {
  getUser,
  approveSuperUser,
  rejectSuperUser,
  approveUser,
  rejectUser,
  getAdminUserId,
} = require("../../../database/queries/user");
const { status, roles } = require("../../../constants/users");

module.exports = async function updateUser(req, res) {
  // TODO replace with current logged in admin ID
  const adminIdPlaceholder = await getAdminUserId();

  const updatedUser = req.body;
  const previousUser = await getUser(updatedUser._id);

  const userVerified = (previous, updated) =>
    previous.role === roles.USER &&
    previous.status === status.UNVERIFIED &&
    updated.status === status.VERIFIED;

  const userRejected = (previous, updated) =>
    previous.role === roles.USER &&
    previous.status === status.UNVERIFIED &&
    updated.status === status.REJECTED;

  const superUserGranted = (previous, updated) =>
    previous.status === status.AWAITING_SUPER &&
    updated.status === status.VERIFIED &&
    updated.role === roles.SUPERUSER;

  const superUserRejected = (previous, updated) =>
    previous.status === status.AWAITING_SUPER &&
    updated.status === status.VERIFIED &&
    updated.role !== roles.SUPERUSER;

  const updateDatabase = async (query, args, msg) => {
    try {
      await query(...args);
      const updatedUserProfile = await getUser(updatedUser._id);
      res.send({ msg });
    } catch (err) {
      res
        .status(500)
        .send(
          "Sorry, there has been an internal server error updating the user caused by this request",
        );
    }
  };

  if (userRejected(previousUser, updatedUser)) {
    return updateDatabase(
      rejectUser,
      [updatedUser._id],
      "User has been rejected",
    );
  }
  if (userVerified(previousUser, updatedUser)) {
    return updateDatabase(
      approveUser,
      [updatedUser._id, adminIdPlaceholder],
      "User has been verified",
    );
  }
  if (superUserRejected(previousUser, updatedUser)) {
    return updateDatabase(
      rejectSuperUser,
      [updatedUser._id],
      "Request for Super User access has been rejected",
    );
  }
  if (superUserGranted(previousUser, updatedUser)) {
    return updateDatabase(
      approveSuperUser,
      [updatedUser._id, adminIdPlaceholder],
      "Request for Super User access granted",
    );
  }
  return res
    .status(400)
    .send(
      "There was a problem with the data submitted, please check and try again.",
    );
};
