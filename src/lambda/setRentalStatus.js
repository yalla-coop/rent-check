import connectToDatabase from './database/dbConnection';
import { setRecordStatus } from './database/queries/rentalRecord';

async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod !== 'PATCH') {
    return {
      statusCode: 405,
    };
  }

  try {
    const request = JSON.parse(event.body);
    await connectToDatabase();

    await setRecordStatus(request.rentalId, { status: request.newStatus });

    console.log('req', request);

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: `Rental record status successfully updated to ${request.newStatus}`,
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
