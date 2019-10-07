/**
 * @jest-environment node
 */
import RentalRecord from '../../../lambda/database/models/RentalRecord';
import buildData from '../../../lambda/database/data/index';

// import the query to test
import {
  deleteUserRecords,
  deleteRecord,
} from '../../../lambda/database/queries/rentalRecord';

describe('Test bulk and single delete rental record queries', () => {
  beforeAll(async done => {
    // connect and build dummy data
    await buildData();
    done();
  });

  test('test delete all rental records for a user', async done => {
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

  test('delete single rental record', async done => {
    const foundRecord = await RentalRecord.findOne();
    expect(foundRecord._id).toBeDefined();

    await deleteRecord(foundRecord._id);

    const deletedRecord = await RentalRecord.findById(foundRecord._id);

    expect(deletedRecord).toBe(null);
    done();
  });
});
