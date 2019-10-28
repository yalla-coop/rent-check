const boom = require("@hapi/boom");

const connectToDatabase = require("../../../database/dbConnection");
const getSuperUserSubUsers = require("../../../database/queries/user/getSuperUserSubUsers");
const getRentalRecordsByIds = require("../../../database/queries/rentalRecord/getRentalRecordsByIds");
const { roles } = require("../../../constants/users");

// temp
const User = require("../../../database/models/User");

// Stub - function to be replaced with one that gets ID of logged in user
const getCurrentUser = () => User.findOne({ name: "Farah Zaqout" });

module.exports = async function getSuperUserRecords(req, res, next) {
  try {
    await connectToDatabase();
  } catch (err) {
    return next(boom.badImplementation(err));
  }

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return next(
        boom.forbidden("Please make sure you are logged in and try again"),
      );
    }

    const isSuperUser = currentUser.role === roles.SUPERUSER;

    if (!isSuperUser) {
      return next(boom.forbidden("Request not allowed"));
    }

    const users = await getSuperUserSubUsers(currentUser._id);

    if (!users.length) {
      return next(boom.notFound("Superuser has no sub users"));
    }
    const rentalRecords = await getRentalRecordsByIds(users);

    return res.status(200).send(rentalRecords);
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};
