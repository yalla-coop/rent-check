/**
 * @jest-environment node
 */
import buildData from '../../lambda/database/data/index';
import User from '../../lambda/database/models/User';
import { roles, status } from '../../constants/users';
import { handler } from '../../lambda/manageSuperUserStatus';

describe('Test manageSuperUserStatus handler', () => {
  beforeEach(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test('update should work according to event passed to handler -> approve', async done => {
    const superUserRequest = await User.findOne({
      status: status.AWAITING_SUPER,
    });

    const adminUser = await User.findOne({
      role: roles.ADMIN,
    });

    const request = {
      admin: adminUser._id,
      user: superUserRequest._id,
      action: 'approve',
    };

    const manageSuperUserStatus = await handler(request, {});

    expect(manageSuperUserStatus.statusCode).toBe(200);
    expect(JSON.parse(manageSuperUserStatus.body).data.status).toBe(
      status.VERIFIED
    );
    expect(JSON.parse(manageSuperUserStatus.body).data.role).toBe(
      roles.SUPERUSER
    );
    expect(
      JSON.parse(manageSuperUserStatus.body).data.grantedSuperBy.toString()
    ).toBe(adminUser._id.toString());
    done();
  });

  test('update should work according to event passed to handler -> reject', async done => {
    const superUserRequest = await User.findOne({
      status: status.AWAITING_SUPER,
    });

    const adminUser = await User.findOne({
      role: roles.ADMIN,
    });

    const request = {
      admin: adminUser._id,
      user: superUserRequest._id,
      action: 'reject',
    };

    const manageSuperUserStatus = await handler(request, {});

    expect(manageSuperUserStatus.statusCode).toBe(200);
    expect(JSON.parse(manageSuperUserStatus.body).data.status).toBe(
      status.VERIFIED
    );
    expect(JSON.parse(manageSuperUserStatus.body).data.role).toBe(roles.USER);
    done();
  });

  test('update should not work if invalid request', async done => {
    const request = {
      admin: 'anything',
      user: 'nothing',
      action: 'reject',
    };

    const manageSuperUserStatus = await handler(request, {});

    expect(manageSuperUserStatus.statusCode).toBe(500);

    expect(JSON.parse(manageSuperUserStatus.body).error).toBeDefined();
    done();
  });
});
