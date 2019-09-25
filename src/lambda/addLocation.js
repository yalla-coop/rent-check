import connectToDatabase from './database/dbConnection';
import RentalRecord from './database/models/RentalRecord';
import { getSingleGeo } from './models/postcodes';
import User from './database/models/User';

// Stub - function to be replaced with one that gets ID of logged in user
const getCurrentUserId = async () => {
  const user = await User.findOne({ name: 'Michael Watts' });
  return user._id;
};

const addRentalRecord = async record => {
  const result = await RentalRecord.create(record);
  return result;
};

const getGeoLocation = async location => {
  const geo = await getSingleGeo(location.postcode);
  return JSON.stringify(geo);
};

export async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod === 'POST') {
    const location = JSON.parse(event.body);
    try {
      await connectToDatabase();
      location.submittedBy = await getCurrentUserId();
      location.geoLocation = await getGeoLocation(location);
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
