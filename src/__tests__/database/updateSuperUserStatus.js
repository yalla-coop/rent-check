/**
 * @jest-environment node
 */
import User from '../../lambda/database/models/User';
import buildData from '../../lambda/database/data/index';
import { roles, status } from '../../constants/users';

import {
  rejectSuperUser,
  approveSuperUser,
} from '../../lambda/database/queries/user';

describe('Test queries to update status for awaitingSuperUser', () => {
  beforeEach(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test('rejectSuperUser', async done => {
    const superUserRequest = await User.findOne({
      status: status.AWAITING_SUPER,
    });

    rejectSuperUser(superUserRequest._id).then(updatedUser => {
      expect(updatedUser).toBeDefined();
      expect(updatedUser.status).toBe(status.VERIFIED);
      done();
    });
  });

  test('approveSuperUser', async done => {
    const superUserRequest = await User.findOne({
      status: status.AWAITING_SUPER,
    });

    const adminUser = await User.findOne({
      role: roles.ADMIN,
    });

    approveSuperUser(superUserRequest._id, adminUser._id).then(updatedUser => {
      expect(updatedUser).toBeDefined();
      expect(updatedUser.status).toBe(status.VERIFIED);
      expect(updatedUser.role).toBe(roles.SUPERUSER);
      expect(updatedUser.grantedSuperBy.toString()).toBe(
        adminUser._id.toString()
      );
      done();
    });
  });
});
