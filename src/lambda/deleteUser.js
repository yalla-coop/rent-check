import connectToDatabase from './database/dbConnection';
import { deleteUser } from './database/queries/user';
import { deleteUserRecords } from './database/queries/rentalRecord';

async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: JSON.stringify({ msg: 'Method not allowed' }),
    };
  }

  try {
    const user = JSON.parse(event.body);
    await connectToDatabase();

    await deleteUserRecords(user.userId);
    const { deletedCount } = await deleteUser(user.userId);

    if (deletedCount !== 1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ msg: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: 'User and all their rental data successfully deleted',
        userId: user.userId,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Internal server error' }),
    };
  }
}

export { handler };
