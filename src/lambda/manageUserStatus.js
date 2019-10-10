// handles request to approve/ reject user awaiting verification or super user status
import middy from 'middy';
import User from './database/models/User';

import connectToDatabase from './database/dbConnection';
import {
  approveSuperUser,
  rejectSuperUser,
  approveUser,
  rejectUser,
} from './database/queries/user';
import { status } from '../constants/users';

// validation scheam
import manageUserStatusSchema from './utils/manageUserStatusSchema';
import validationMiddleware from './middlewares/validation';

// Stub - function to be replaced with one that gets ID of logged in user
// const getCurrentUserId = () => User.findOne({ name: 'Michael Watts' });
const getCurrentUserId = () => User.findOne({ name: 'Krissie Nicholson' });

async function manageUserStatus(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();
    // This will need some refactor when the roles are ready
    const { user: userId, action, userStatus } = JSON.parse(event.body);

    const admin = await getCurrentUserId();

    let update;
    let msg;

    // // TODO: the authorizaion based on role logic
    // if (admin.role !== admin) {
    //   const err = new Error('Not authrized to do this');
    //   err.statusCode = 401;
    //   throw err;
    // }

    switch (action) {
      case 'approve':
        if (userStatus === status.AWAITING_SUPER) {
          update = await approveSuperUser(userId, admin);
          msg = 'approved super user status!';
        } else {
          update = await approveUser(userId, admin);
          msg = 'verified user!';
        }
        break;

      case 'reject':
        if (userStatus === status.AWAITING_SUPER) {
          update = await rejectSuperUser(userId);
          msg = 'rejected super user status!';
        } else {
          update = await rejectUser(userId);
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

const handler = middy(manageUserStatus).use(
  validationMiddleware(manageUserStatusSchema)
);
export { handler, manageUserStatus };
