const { setRecordStatus } = require("../../../database/queries/rentalRecord");

module.exports = async function updateLocations(req, res) {
  const request = req.body;

  try {
    const updatedRecord = await setRecordStatus(request.rentalId, {
      status: request.newStatus
    });

    res.status(200).json({
      msg: `Rental record status successfully updated to ${request.newStatus}`,
      updatedRecord: updatedRecord
    });
  } catch (err) {
    console.log("err", err);
    res
      .status(500)
      .send(
        "Sorry, there has been an internal server error updating the record status caused by this request"
      );
  }
};
