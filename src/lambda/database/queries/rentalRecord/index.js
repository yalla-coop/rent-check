import RentalRecord from '../../models/RentalRecord';

export const addRentalRecord = async record => {
  const result = await RentalRecord.create(record);
  return result;
};

export const getAllValidRecords = async () => {
  const records = await RentalRecord.find();
  return records;
};
