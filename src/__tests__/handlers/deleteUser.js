/**
 * @jest-environment node
 */
import User from '../../lambda/database/models/User';
import buildData from '../../lambda/database/data/index';

// import handler to test
import { handler } from '../../lambda/deleteUser';

describe('Test deleteUser handler', () => {
  beforeAll(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test('user and rental records successfully deleted', async done => {
    const usersInDB = await User.find();
    const event = {
      body: JSON.stringify({ userId: usersInDB[0]._id }),
      httpMethod: 'DELETE',
    };

    const deleteUser = await handler(event, {});
    expect(deleteUser.statusCode).toBe(200);

    const newUsersInDB = await User.find();

    expect(newUsersInDB.length).toBe(usersInDB.length - 1);

    done();
  });
});