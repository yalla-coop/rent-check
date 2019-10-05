// handles request to approve/ reject user awaiting verification or super user status

import connectToDatabase from './database/dbConnection';
import {
  approveSuperUser,
  rejectSuperUser,
  approveUser,
  rejectUser,
  getUser,
} from './database/queries/user';
import { status } from '../constants/users';

export async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();
    const { user, admin, action, userStatus } = JSON.parse(event.body);

    let update;
    let msg;
    const adminExists = await getUser(admin);
    // check if admin ID Error
    if (!adminExists) {
      throw new Error();
    }

    switch (action) {
      case 'approve':
        if (userStatus === status.AWAITING_SUPER) {
          update = await approveSuperUser(user, admin);
          msg = 'approved super user status!';
        } else {
          update = await approveUser(user, admin);
          msg = 'verified user!';
        }
        break;

      case 'reject':
        if (userStatus === status.AWAITING_SUPER) {
          update = await rejectSuperUser(user);
          msg = 'rejected super user status!';
        } else {
          update = await rejectUser(user);
          msg = 'rejected user!';
        }
        break;

      default:
        update = null;
        msg = 'no success updating user status!';
        break;
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ data: update, msg }),
    };
  } catch (err) {
    // respond to user ID mongo cast error
    if (err.name === 'CastError') {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'user ID invalid!' }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
