const {
  deleteSingleRecord,
} = require("../../../database/queries/rentalRecord");

module.exports = async function deleteLocations(req, res) {
  const record = req.body;

  try {
    const { deletedCount } = await deleteSingleRecord(record.rentalId);

    if (deletedCount !== 1) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send({ msg: "Rental data successfully deleted" });
  } catch (err) {
    return res
      .status(500)
      .send(
        "Sorry, there has been an internal server error deleting the record caused by this request",
      );
  }
};
// TODO - admin can delete a rental record from the database
