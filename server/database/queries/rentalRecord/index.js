const RentalRecord = require("../../models/RentalRecord");

const addRentalRecord = require("./addRentalRecord");
const getAllRentalRecords = require("./getAllRentalRecords");
const getRentalRecordsByUserId = require("./getRentalRecordsByUserId");
const getAllRentalRecordsAdmin = require("./getAllRentalRecordsAdmin");

module.exports = {
  addRentalRecord,
  getAllRentalRecords,
  getRentalRecordsByUserId,
  getAllRentalRecordsAdmin,
};
