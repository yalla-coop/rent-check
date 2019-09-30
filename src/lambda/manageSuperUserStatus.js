import connectToDatabase from './database/dbConnection';
import { approveSuperUser, rejectSuperUser } from './database/queries/user';

export async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();

    let update;
    let msg;

    switch (event.action) {
      case 'approve':
        update = await approveSuperUser(event.user, event.admin);
        msg = 'approved user to be super user';
        break;

      case 'reject':
        update = await rejectSuperUser(event.user);
        msg = 'rejected user to become super user';
        break;

      default:
        update = null;
        msg = 'no success updating super user status';
        break;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ data: update, msg }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
