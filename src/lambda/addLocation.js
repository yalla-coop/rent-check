import middy from 'middy';

import connectToDatabase from './database/dbConnection';
import User from './database/models/User';
import { getSingleGeo } from './utils/postcodes';
import { addRentalRecord } from './database/queries/rentalRecord';
import { status } from '../constants/rentalRecords';
import { roles } from '../constants/users';
import validaitonMiddelware from './utils/validation';
import rentalValidationSchema from '../components/RentalForm/rentalForm.validation';

// Stub - function to be replaced with one that gets ID of logged in user
const getCurrentUser = () => User.findOne({ name: 'Michael Watts' });

async function addLocation(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
    };
  }
  try {
    const rentalRecord = JSON.parse(event.body);
    if (!rentalRecord.postcode) {
      return {
        statusCode: 400,
        body: { error: 'Location must include postcode' },
      };
    }
    await connectToDatabase();

    const user = await getCurrentUser();
    rentalRecord.submittedBy = user._id;
    rentalRecord.geoLocation = await getSingleGeo(rentalRecord.postcode);
    if (user.role === roles.ADMIN) {
      rentalRecord.status = status.VERIFIED;
    } else {
      rentalRecord.status = status.UNVERIFIED;
    }
    const result = await addRentalRecord(rentalRecord);
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

const handler = middy(addLocation).use(
  validaitonMiddelware(rentalValidationSchema)
);
export { handler };
