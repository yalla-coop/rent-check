const { deleteRecord } = require("../../../database/queries/rentalRecord");

module.exports = async function deleteLocations(req, res) {
  const record = req.body;

  try {
    const { deletedCount } = await deleteRecord(record.rentalId);

    if (deletedCount !== 1) {
      res.status(404).send("User not found");
    }
    res.status(200).json({ msg: "Rental data successfully deleted" });
  } catch (err) {
    console.log("err", err);
    res
      .status(500)
      .send(
        "Sorry, there has been an internal server error deleting the record caused by this request"
      );
  }
};
