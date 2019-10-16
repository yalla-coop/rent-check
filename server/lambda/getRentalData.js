import connectToDatabase from './database/dbConnection';

// import db query
import { getAllData } from './database/queries/rentalRecord';

export async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const rentalRecords = await getAllData();
    return {
      statusCode: 200,
      body: JSON.stringify(rentalRecords),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ msg: err.message }) };
  }
}
