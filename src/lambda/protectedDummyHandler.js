import middy from 'middy';
import authMiddleware from './utils/middleware';

require('dotenv').config();

async function protectedHandler(event, context) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'hi' }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}

const handler = middy(protectedHandler).use(authMiddleware());
export { handler };
