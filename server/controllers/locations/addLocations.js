const connectToDatabase = require("../../database/dbConnection");
const User = require("../../database/models/User");
const getSingleGeo = require("../../utils/postcodes");
const { addRentalRecord } = require("../../database/queries/rentalRecord");
const { status } = require("../../constants/rentalRecords");
const { roles } = require("../../constants/users");

// Stub - function to be replaced with one that gets ID of logged in user
const getCurrentUser = () => User.findOne({ name: "Krissie Nicholson" });

// add single location as non-admin user
module.exports = async function addLocations(req, res) {
  const rentalRecord = req.body;
  try {
    await connectToDatabase();
    const user = await getCurrentUser();
    rentalRecord.geoLocation = await getSingleGeo(rentalRecord.postcode);
    rentalRecord.submittedBy = user._id;
    rentalRecord.status = status.UNVERIFIED;
    const result = await addRentalRecord(rentalRecord);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
