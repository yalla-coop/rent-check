import connectToDatabase from './database/dbConnection';
import { deleteUser } from './database/queries/user';
import { deleteUserRecords } from './database/queries/rentalRecord';

// won't be needed once auth is set up
import User from './database/models/User';

export async function handler(event, context) {
  try {
    // until auth is setup get a random user from database
    const foundUser = await User.findOne();

    await connectToDatabase();
    await deleteUserRecords(foundUser._id);
    await deleteUser(foundUser._id);
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: 'User and all their rental data successfully deleted',
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
}
