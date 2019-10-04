import RentalRecord from '../../models/RentalRecord';

export const addRentalRecord = record => RentalRecord.create(record);
export const getAllValidRecords = () => RentalRecord.find();

export const deleteUserRecords = userId =>
  RentalRecord.deleteMany({ submittedBy: userId });
