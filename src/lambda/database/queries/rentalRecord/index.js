import RentalRecord from '../../models/RentalRecord';

export const addRentalRecord = async record => {
  const result = await RentalRecord.create(record);
  return result;
};
