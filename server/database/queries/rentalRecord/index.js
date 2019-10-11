const RentalRecord = require("../../models/RentalRecord");

const addRentalRecord = record => RentalRecord.create(record);
const getAllValidRecords = () => RentalRecord.find();
const getRentalRecordsByUserId = id => RentalRecord.find({ submittedBy: id });

module.exports = {
  addRentalRecord,
  getAllValidRecords,
  getRentalRecordsByUserId,
};
