// import middy from 'middy';
// const authMiddleware = require('./utils/middleware');
// import authMiddleware from './utils/middleware';

require('dotenv').config();

const { getNoGeo, getAllValidRows } = require('./models/getRecords');
const { updateGeo } = require('./models/updateRecords');

export async function handler(event, context) {
  try {
    const rowsWithNoGeolocation = await getNoGeo();
    updateGeo(rowsWithNoGeolocation);
    const locations = await getAllValidRows();
    return {
      statusCode: 200,
      body: JSON.stringify(locations),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
}

// uncomment this and change the function name to protect the route
// const handler = middy(getLocations).use(authMiddleware());

// export { handler };
