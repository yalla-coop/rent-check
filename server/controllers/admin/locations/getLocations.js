const connectToDatabase = require("../../../database/dbConnection");
const {
  getAllRentalRecordsAdmin,
} = require("../../../database/queries/rentalRecord");

// admin can get all the records including info of the users who verified the data
module.exports = async function getLocations(req, res) {
  try {
    await connectToDatabase();
    const locations = await getAllRentalRecordsAdmin();
    return res.status(200).send(locations);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
