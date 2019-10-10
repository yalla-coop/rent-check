/**
 * @jest-environment node
 */
import RentalRecord from '../../lambda/database/models/RentalRecord';
import buildData from '../../lambda/database/data/index';

// import handler to test
import { handler } from '../../lambda/setRentalStatus';

// constants
import { status } from '../../constants/rentalRecords';

describe('Test setRentalStatus handler', () => {
  beforeAll(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test('user and rental records successfully deleted', async done => {
    const recordInDB = await RentalRecord.findOne({
      status: status.UNVERIFIED,
    });
    expect(recordInDB._id).toBeDefined();
    expect(recordInDB.status).toBe(status.UNVERIFIED);

    const event = {
      body: JSON.stringify({
        rentalId: recordInDB._id,
        newStatus: status.VERIFIED,
      }),
      httpMethod: 'PATCH',
    };

    const updatedRecord = await handler(event, {});
    expect(updatedRecord.statusCode).toBe(200);
    expect(JSON.parse(updatedRecord.body)).toMatchObject({
      msg: `Rental record status successfully updated to ${status.VERIFIED}`,
    });

    const updatedRecordInDB = await RentalRecord.findById(recordInDB._id);

    expect(updatedRecordInDB.status).toBe(status.VERIFIED);

    done();
  });

  test('returns error for incorrect http request', async done => {
    const recordInDB = await RentalRecord.findOne();
    expect(recordInDB._id).toBeDefined();

    const event = {
      body: JSON.stringify({
        rentalId: recordInDB._id,
        newStatus: status.VERIFIED,
      }),
      httpMethod: 'DELETE',
    };
    const updatedRecord = await handler(event, {});

    expect(updatedRecord.statusCode).toBe(405);
    done();
  });
});
