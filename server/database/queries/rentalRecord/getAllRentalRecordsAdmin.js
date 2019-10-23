const RentalRecord = require("../../models/RentalRecord");

module.exports = async function getAllRentalRecordsAdmin() {
  return RentalRecord.aggregate([
    // get details of the user who submitted it
    {
      $lookup: {
        from: "users",
        localField: "submittedBy",
        foreignField: "_id",
        as: "submittedBy",
      },
    },
    // get details of the user who verified it
    {
      $lookup: {
        from: "users",
        localField: "reviewedBy",
        foreignField: "_id",
        as: "reviewedBy",
      },
    },
    {
      $unwind: { path: "$submittedBy", preserveNullAndEmptyArrays: true },
    },
    {
      $unwind: { path: "$reviewedBy", preserveNullAndEmptyArrays: true },
    },
    // remove unnecessary fields from the returned object
    {
      $project: {
        "submittedBy.name": 0,
        "submittedBy.role": 0,
        "submittedBy.status": 0,
        "submittedBy.companyName": 0,
        "submittedBy.companyAddress": 0,
        "submittedBy.verifiedBy": 0,
        "submittedBy.grantedSuperBy": 0,
        "reviewedBy.name": 0,
        "reviewedBy.role": 0,
        "reviewedBy.status": 0,
        "reviewedBy.companyName": 0,
        "reviewedBy.companyAddress": 0,
        "reviewedBy.verifiedBy": 0,
        "reviewedBy.grantedSuperBy": 0,
      },
    },
  ]);
};
