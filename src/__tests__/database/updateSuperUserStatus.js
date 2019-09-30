/**
 * @jest-environment node
 */
import mongoose from 'mongoose';
import User from '../../lambda/database/models/User';
import buildData from '../../lambda/database/data/index';
import resetDb from '../../lambda/database/resetDb';
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
    expect(User).toBeDefined();
    const awaitingSuperUserStatus = await User.findOne({
      status: status.AWAITING_SUPER,
    });
    const userId = awaitingSuperUserStatus._id;
    expect(userId).toBeDefined();

    rejectSuperUser(userId).then(updatedUser => {
      expect(updatedUser).toBeDefined();
      expect(updatedUser.status).toBe(status.VERIFIED);
      done();
    });
  });

  test('approveSuperUser', async done => {
    expect(User).toBeDefined();
    const awaitingSuperUserStatus = await User.findOne({
      status: status.AWAITING_SUPER,
    });
    expect(awaitingSuperUserStatus).toBeDefined();
    const userId = awaitingSuperUserStatus._id;
    expect(userId).toBeDefined();

    approveSuperUser(userId).then(updatedUser => {
      expect(updatedUser).toBeDefined();
      expect(updatedUser.status).toBe(status.VERIFIED);
      expect(updatedUser.role).toBe(roles.SUPERUSER);
      expect(updatedUser.grantedSuperBy.toString()).toBe(userId.toString());
      done();
    });
  });
});
