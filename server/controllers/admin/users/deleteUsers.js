const connectToDatabase = require("../../../database/dbConnection");
const { deleteUser } = require("../../../database/queries/user");
const { deleteUserRecords } = require("../../../database/queries/rentalRecord");

module.exports = async function deleteUser(req, res) {
  const user = req.body;
  console.log("REQ", req.body);
  try {
    await connectToDatabase();
    await deleteUserRecords(user.userId);
    const { deletedCount } = await deleteUser(user.userId);

    if (deletedCount !== 1) {
      res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({
      msg: "User and all their rental data successfully deleted",
      userId: user.userId
    });
  } catch (err) {
    console.log("ERR", err);
    res.status(500).send(err.message);
  }
};
