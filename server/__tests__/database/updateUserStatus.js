/**
 * @jest-environment node
 */
import User from '../../lambda/database/models/User';
import buildData from '../../lambda/database/data/index';
import { roles, status } from '../../constants/users';

import {
  rejectSuperUser,
  approveSuperUser,
  rejectUser,
  approveUser,
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

  test('rejectUser', async done => {
    const userRequest = await User.findOne({
      status: status.UNVERIFIED,
    });

    rejectUser(userRequest._id).then(updatedUser => {
      expect(updatedUser).toBeDefined();
      expect(updatedUser.status).toBe(status.REJECTED);
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

  test('approveUser', async done => {
    const userRequest = await User.findOne({
      status: status.UNVERIFIED,
    });

    const adminUser = await User.findOne({
      role: roles.ADMIN,
    });

    approveUser(userRequest._id, adminUser._id).then(updatedUser => {
      expect(updatedUser).toBeDefined();
      expect(updatedUser.status).toBe(status.VERIFIED);
      expect(updatedUser.verifiedBy.toString()).toBe(adminUser._id.toString());
      done();
    });
  });
});
