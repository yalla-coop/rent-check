// handles request to approve/ reject user awaiting verification or super user status
// receives request { adminId, userId, action }

import connectToDatabase from './database/dbConnection';
import {
  approveSuperUser,
  rejectSuperUser,
  approveUser,
  rejectUser,
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

    switch (action) {
      case 'approve':
        if (userStatus === status.AWAITING_SUPER) {
          update = await approveSuperUser(user, admin);
          msg = 'approved user to be super user';
        } else {
          update = await approveUser(user, admin);
          msg = 'user verified';
        }
        break;

      case 'reject':
        if (userStatus === status.AWAITING_SUPER) {
          update = await rejectSuperUser(user);
          msg = 'rejected user to become super user';
        } else {
          update = await rejectUser(user);
          msg = 'rejected user';
        }
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
