import connectToDatabase from './database/dbConnection';
import { getAllUsers } from './database/queries/user';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

export async function handler(event, context) {
  console.log('reached');

  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();
    const users = await getAllUsers();

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: users }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
}
