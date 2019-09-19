import middy from 'middy';
import authMiddleware from './utils/middleware';

require('dotenv').config();

// this is a protected demo route
// http://localhost:9000/.netlify/functions/protected

async function protectedHandler(event, context) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'this is a secret msg' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
}

const handler = middy(protectedHandler).use(authMiddleware());
export { handler };
