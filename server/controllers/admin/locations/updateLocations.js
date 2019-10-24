const { setRecordStatus } = require("../../../database/queries/rentalRecord");

module.exports = async function updateLocations(req, res) {
  const request = req.body;

  try {
    const updatedRecord = await setRecordStatus(request.rentalId, {
      status: request.newStatus,
    });

    return res.status(200).send({
      msg: `Rental record status successfully updated to ${request.newStatus}`,
      updatedRecord,
    });
  } catch (err) {
    return res
      .status(500)
      .send(
        "Sorry, there has been an internal server error updating the record status caused by this request",
      );
  }
};
