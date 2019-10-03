import connectToDatabase from './database/dbConnection';
import { getAllUsers } from './database/queries/user';

export async function handler(event, context) {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-param-reassign
    context.callbackWaitsForEmptyEventLoop = false;
  }

  try {
    await connectToDatabase();
    const user = await getAllUsers();
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
