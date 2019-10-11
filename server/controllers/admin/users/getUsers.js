const connectToDatabase = require("../../database/dbConnection");
const { getAllUsers } = require("../../database/queries/user");

module.exports = async function getLocations(req, res) {
  try {
    await connectToDatabase();
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
