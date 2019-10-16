import RentalRecord from '../../models/RentalRecord';

export const addRentalRecord = record => RentalRecord.create(record);

// TODO: Add pagination to admin panel queries
export const getAllValidRecords = () => RentalRecord.find().limit(10000);
export const getRentalRecordsByUserId = id =>
  RentalRecord.find({ submittedBy: id });
