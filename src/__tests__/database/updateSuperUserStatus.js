/**
 * @jest-environment node
 */

import User from '../../lambda/database/models/User';
import buildData from '../../lambda/database/data/index';
import { roles, status } from '../../constants/users';

import { rejectSuperUser } from '../../lambda/database/queries/user';

describe('Test queries to update status for awaitingSuperUser', () => {
  beforeAll(async done => {
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
    await rejectSuperUser(userId).then(res => {
      expect(res).toBeDefined();
      expect(res.status).toBe('verified');
      done();
    });
  });
});
