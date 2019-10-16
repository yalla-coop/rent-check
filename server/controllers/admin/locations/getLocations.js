const connectToDatabase = require("../../../database/dbConnection");
const {
  getAllRentalRecordsAdmin,
} = require("../../../database/queries/rentalRecord");

module.exports = async function getLocations(req, res) {
  try {
    await connectToDatabase();
    const locations = await getAllRentalRecordsAdmin();
    res.status(200).send(locations);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
