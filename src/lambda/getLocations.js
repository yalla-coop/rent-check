// import middy from 'middy';
// const authMiddleware = require('./utils/middleware');
// import authMiddleware from './utils/middleware';

require('dotenv').config();

const { getNoGeo, getAllValidRows } = require('./models/getRecords');
const { updateGeo } = require('./models/updateRecords');

// exports.handler = async (event, context) => {
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
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}

// const handler = middy(getLocations).use(authMiddleware());

// export { handler };
