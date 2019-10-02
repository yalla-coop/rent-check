import connectToDatabase from './database/dbConnection';
import RentalRecord from './database/models/RentalRecord';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

export async function handler(event, context) {
  console.log(event.headers);
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const locations = await RentalRecord.find();
    return {
      statusCode: 200,
      body: JSON.stringify(locations),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
}
