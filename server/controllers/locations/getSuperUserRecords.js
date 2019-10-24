const boom = require("@hapi/boom");

const connectToDatabase = require("../../database/dbConnection");
const getSuperUserUsers = require("../../database/queries/user/getSuperUserUsers");
const getRentalRecordsByIds = require("../../database/queries/rentalRecord/getRentalRecordsByIds");
const isValidMongoID = require("../../utils/isValidMongoID");

module.exports = async function getLocations(req, res, next) {
  const { id: userId } = req.params;

  if (!isValidMongoID(userId)) {
    return next(boom.badData("unvalid user ID"));
  }

  // check the user role and return 403 if not authorized

  try {
    await connectToDatabase();
    const users = await getSuperUserUsers(userId);
    if (!users.length) {
      return next(boom.notFound("Superuser has no sub users"));
    }
    const rentalRecords = await getRentalRecordsByIds(users);

    return res.status(200).send(rentalRecords);
  } catch (err) {
    return next(boom.badImplementation(err));
  }
};
