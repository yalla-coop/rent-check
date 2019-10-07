import connectToDatabase from './database/dbConnection';
import { deleteUser } from './database/queries/user';
import { deleteUserRecords } from './database/queries/rentalRecord';

async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
    };
  }

  try {
    const user = JSON.parse(event.body);
    await connectToDatabase();

    await deleteUserRecords(user.userId);
    await deleteUser(user.userId);
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

export { handler };
