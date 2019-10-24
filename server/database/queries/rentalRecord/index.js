const RentalRecord = require("../../models/RentalRecord");

const addRentalRecord = require("./addRentalRecord");
const getAllRentalRecords = require("./getAllRentalRecords");
const getRentalRecordsByUserId = require("./getRentalRecordsByUserId");
const getAllRentalRecordsAdmin = require("./getAllRentalRecordsAdmin");
const deleteUserRecords = require("./deleteUserRecords");
const deleteSingleRecord = require("./deleteSingleRecord");
const setRecordStatus = require("./setRecordStatus");

module.exports = {
  addRentalRecord,
  getAllRentalRecords,
  getRentalRecordsByUserId,
  getAllRentalRecordsAdmin,
  deleteUserRecords,
  deleteSingleRecord,
  setRecordStatus
};
