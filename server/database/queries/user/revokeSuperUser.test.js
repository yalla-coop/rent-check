/**
 * @jest-environment node
 */
const User = require('../../models/User');
const buildData = require('../../data/index');
const { roles } = require('../../../constants/users');

const { revokeSuperUser } = require('../../queries/user');

describe('revokeSuperUser updates user role', () => {
  beforeEach(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test('revokeSuperUser', async done => {
    const superUser = await User.findOne({
      role: roles.SUPERUSER
    });

    revokeSuperUser(superUser._id).then(updatedUser => {
      expect(updatedUser).toBeDefined();
      expect(updatedUser.role).toBe(roles.USER);
      done();
    });
  });
});
