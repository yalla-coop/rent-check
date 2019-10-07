/**
 * @jest-environment node
 */
import RentalRecord from '../../../lambda/database/models/RentalRecord';
import buildData from '../../../lambda/database/data/index';

// import the query to test
import { setRecordStatus } from '../../../lambda/database/queries/rentalRecord';

// constants
import { status } from '../../../constants/rentalRecords';

describe('Test updating the rental record status', () => {
  beforeAll(async done => {
    // connect and build dummy data
    await buildData();
    done();
  });

  test('test updating record status', async done => {
    const foundRecord = await RentalRecord.findOne({
      status: status.UNVERIFIED,
    });
    expect(foundRecord).toBeDefined();
    expect(foundRecord._id).toBeDefined();

    const newStatus = { status: status.VERIFIED };

    await setRecordStatus(foundRecord._id, newStatus);

    const updatedRecord = await RentalRecord.findById(foundRecord._id);

    expect(updatedRecord.status).toBe(status.VERIFIED);
    done();
  });
});
