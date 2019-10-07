import connectToDatabase from './database/dbConnection';
import { deleteRecord } from './database/queries/rentalRecord';

async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
    };
  }

  try {
    const record = JSON.parse(event.body);
    await connectToDatabase();

    console.log('REC', record);

    // return record;

    await deleteRecord(record.rentalId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: 'Rental data successfully deleted',
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
