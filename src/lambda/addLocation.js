import connectToDatabase from './database/dbConnection';
import User from './database/models/User';
import { getSingleGeo } from './utils/postcodes';
import { addRentalRecord } from './database/queries/rentalRecord';

// Stub - function to be replaced with one that gets ID of logged in user
const getCurrentUserId = async () => {
  const user = await User.findOne({ name: 'Michael Watts' });
  return user._id;
};

export async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod === 'POST') {
    const location = JSON.parse(event.body);
    try {
      await connectToDatabase();
      location.submittedBy = await getCurrentUserId();
      location.geoLocation = await getSingleGeo(location);
      const result = await addRentalRecord(location);
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server error' }),
      };
    }
  }
  return {
    statusCode: 405,
  };
}
