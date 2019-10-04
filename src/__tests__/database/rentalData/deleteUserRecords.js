/**
 * @jest-environment node
 */
import RentalRecord from '../../../lambda/database/models/RentalRecord';
import buildData from '../../../lambda/database/data/index';

// import the query to test
import { deleteUserRecords } from '../../../lambda/database/queries/rentalRecord';

describe('Test getAllData query for rental records', () => {
  beforeAll(async done => {
    // connect and build dummy data
    await buildData();
    done();
  });

  test('test delete rental records for a user', async done => {
    const foundRecord = await RentalRecord.findOne();
    expect(foundRecord).toBeDefined();
    expect(foundRecord._id).toBeDefined();

    await deleteUserRecords(foundRecord.submittedBy);

    const deletedRecords = await RentalRecord.find({
      submittedBy: foundRecord.submittedBy,
    });

    expect(deletedRecords.length).toBe(0);
    done();
  });
});
