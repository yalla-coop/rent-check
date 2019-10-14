// import middy from 'middy';

import connectToDatabase from './database/dbConnection';

// import validaitonMiddelware from './middlewares/validation';

import { getUserByEmail, addNewUser } from './database/queries/user';

async function addLocation(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
    };
  }
  try {
    const auth0User = JSON.parse(event.body);
    await connectToDatabase();

    // check if user exists
    const user = await getUserByEmail(auth0User.email);
    // add new user if exist
    if (!user) {
      const newUser = {
        email: auth0User.email,
        name: auth0User.nickname,
      };
      await addNewUser(newUser);
    }

    return {
      statusCode: 200,
      body: JSON.stringify('result'),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
}

// const handler = middy(addLocation).use(
//   validaitonMiddelware(rentalValidationSchema)
// );
export { addLocation as handler };
