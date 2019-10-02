// handles request to approve/ reject user awaiting super user status
// receives request { adminId, userId, action }

import connectToDatabase from './database/dbConnection';
import { approveSuperUser, rejectSuperUser } from './database/queries/user';

export async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();
    const { user, admin, action } = JSON.parse(event.body);

    let update;
    let msg;

    switch (action) {
      case 'approve':
        update = await approveSuperUser(user, admin);
        msg = 'approved user to be super user';
        break;

      case 'reject':
        update = await rejectSuperUser(user);
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
