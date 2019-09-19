import mongoose from 'mongoose';
import User from '../../lambda/database/models/users';
import buildData from '../../lambda/database/data/index';

describe('Test dummy data for schemas', () => {
  beforeAll(async () => {
    // build dummy data
    await buildData();
  });

  test('users schema should be defined', async done => {
    expect(User).toBeDefined();
    const foundUser = await User.findOne({ name: 'abdalsamad' });

    expect(foundUser).toBeDefined();
    done();
  });
});
