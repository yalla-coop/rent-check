import connectToDatabase from './database/dbConnection';

// import db query
import { getLocations } from './database/queries/rentalData';

export async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const locations = await getLocations();
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
