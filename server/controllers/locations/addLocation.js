const connectToDatabase = require("../../database/dbConnection");
const User = require("../../database/models/User");
const getSingleGeo = require("../../utils/postcodes");
const { addRentalRecord } = require("../../database/queries/rentalRecord");
const RentalRecord = require("../../database/models/RentalRecord");
const validateByRecord = require("../../utils/validateByModel");
const { status } = require("../../constants/rentalRecords");
const { roles } = require("../../constants/users");

// Stub - function to be replaced with one that gets ID of logged in user
const getCurrentUser = () => User.findOne({ name: "Krissie Nicholson" });

const validateRentalRecord = record => validateByRecord(RentalRecord, record);

// add single location as non-admin user
module.exports = async function addLocation(req, res) {
  const record = req.body;
  if (!record) {
    return res.status(400).send();
  }
  if (!record.postcode) {
    return res.status(400).send();
  }
  try {
    await connectToDatabase();
    const user = await getCurrentUser();
    record.submittedBy = user._id;
    record.status = status.UNVERIFIED;
    record.geoLocation = await getSingleGeo(record.postcode);
  } catch (err) {
    res.status(500).send(err.message);
  }
  const validationError = validateRentalRecord(record);
  if (validationError) {
    return res.status(400).send(validationError);
  }
  try {
    const result = await addRentalRecord(record);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};
