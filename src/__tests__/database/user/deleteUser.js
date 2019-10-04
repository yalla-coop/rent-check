/**
 * @jest-environment node
 */
import User from '../../../lambda/database/models/User';
import buildData from '../../../lambda/database/data/index';

// import the query to test
import { deleteUser } from '../../../lambda/database/queries/user';

describe('Test deleteUser query', () => {
  beforeAll(async done => {
    // connect and build dummy data
    await buildData();
    done();
  });

  test('should get an array of rental records', async done => {
    const foundUser = await User.findOne();

    expect(foundUser).toBeDefined();
    expect(foundUser._id).toBeDefined();

    await deleteUser(foundUser._id);

    const deletedUser = await User.findById(foundUser._id);

    expect(deletedUser).toBe(null);

    done();
  });
});
