import connectToDatabase from './database/dbConnection';
import RentalRecord from './database/models/RentalRecord';

require('dotenv').config();

// const { getNoGeo, getAllValidRows } = require('./models/getRecords');
// const { updateGeo } = require('./models/updateRecords');

export async function handler(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const locations = await RentalRecord.find();
    return {
      statusCode: 200,
      body: JSON.stringify(locations),
    };
  } catch (err) {
    console.error(err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
}

// uncomment this and change the function name to protect the route
// const handler = middy(getLocations).use(authMiddleware());

// export { handler };
