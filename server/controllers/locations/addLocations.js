const connectToDatabase = require("../../database/dbConnection");
const User = require("../../database/models/User");
const { getSingleGeo } = require("../../utils/postcodes");
const { addRentalRecord } = require("../../database/queries/rentalRecord");
const { status } = require("../../constants/rentalRecords");
const { roles } = require("../../constants/users");
//const validaitonMiddelware from "./middlewares/validation";
//const rentalValidationSchema = require("../components/RentalForm/rentalForm.validation");

// Stub - function to be replaced with one that gets ID of logged in user
const getCurrentUser = () => User.findOne({ name: "Krissie Nicholson" });

module.exports = async function addLocations(req, res) {
  try {
    const rentalRecord = req.body;
    await connectToDatabase();
    const user = await getCurrentUser();
    rentalRecord.submittedBy = user._id;
    rentalRecord.geoLocation = await getSingleGeo(rentalRecord.postcode);
    if (user.role === roles.ADMIN) {
      rentalRecord.status = status.VERIFIED;
    } else {
      rentalRecord.status = status.UNVERIFIED;
    }
    const result = await addRentalRecord(rentalRecord);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
