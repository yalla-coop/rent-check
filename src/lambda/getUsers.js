import connectToDatabase from './database/dbConnection';
import User from './database/models/User';

export async function handler(event, context) {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-param-reassign
    context.callbackWaitsForEmptyEventLoop = false;
  }

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
