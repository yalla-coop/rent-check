/**
 * @jest-environment node
 */
import buildData from '../../lambda/database/data/index';
import { handler } from '../../lambda/getUsers';

describe('Test getUsers query', () => {
  beforeAll(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test('users should be found', async done => {
    const getUsers = await handler();
    expect(getUsers.statusCode).toBe(200);
    expect(getUsers.body).toBeDefined();
    expect(getUsers).toBeDefined();
    done();
  });
});
