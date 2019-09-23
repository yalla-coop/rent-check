import connectToDatabase from './database/dbConnection';
import User from './database/models/User';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

export async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const user = await User.find();
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: user }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
}
