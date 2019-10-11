import connectToDatabase from "../../database/dbConnection";
import { getAllValidRecords } from "../../database/queries/rentalRecord";

module.exports = async function getLocations(req, res) {
  try {
    await connectToDatabase();
    const locations = await getAllValidRecords();
    res.statusCode(200).send(locations);
  } catch (err) {
    res.statusCode(500).send(err.message);
  }
};
