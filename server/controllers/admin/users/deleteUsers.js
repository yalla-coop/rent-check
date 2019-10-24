const { deleteUser } = require("../../../database/queries/user");
const { deleteUserRecords } = require("../../../database/queries/rentalRecord");

module.exports = async (req, res) => {
  const user = req.body;
  try {
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
    res
      .status(500)
      .send(
        "Sorry, there has been an internal server error deleting the user caused by this request"
      );
  }
};
