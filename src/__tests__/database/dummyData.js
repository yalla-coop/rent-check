/**
 * @jest-environment node
 */

import User from '../../lambda/database/models/User';
import RentalRecord from '../../lambda/database/models/RentalRecord';
import buildData from '../../lambda/database/data/index';

describe('Test dummy data for schemas', () => {
  beforeAll(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test('users should be built successfully', async done => {
    expect(User).toBeDefined();
    const foundUsers = await User.find();

    expect(foundUsers).toBeDefined();
    expect(foundUsers.length).toBeGreaterThan(0);
    expect(foundUsers[0].name).toBeDefined();
    expect(foundUsers[0].email).toBeDefined();
    expect(foundUsers[0].role).toBeDefined();
    expect(foundUsers[0].status).toBeDefined();
    done();
  });

  test('rentalData should be built successfully', async done => {
    expect(RentalRecord).toBeDefined();
    const foundRentalData = await RentalRecord.find();

    expect(foundRentalData).toBeDefined();
    expect(foundRentalData.length).toBeGreaterThan(0);
    expect(foundRentalData[0].submittedBy).toBeDefined();
    expect(foundRentalData[0].status).toBeDefined();
    expect(foundRentalData[0].geoLocation).toBeDefined();
    expect(foundRentalData[0].postcode).toBeDefined();
    done();
  });
});
