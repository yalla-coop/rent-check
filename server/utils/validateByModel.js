export default function validateByModel(Model, record) {
  const newRecord = new Model(record);
  const error = newRecord.validateSync();
  if (error && error.errors) {
    const errorFields = Object.keys(error.errors);
    return errorFields.map(field => error.errors[field].message).join(" ");
  }
  return error;
}
