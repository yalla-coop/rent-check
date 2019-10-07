/**
 * @jest-environment node
 */
import RentalRecord from '../../lambda/database/models/RentalRecord';
import buildData from '../../lambda/database/data/index';

// import handler to test
import { handler } from '../../lambda/deleteRecord';

describe('Test deleteUser handler', () => {
  beforeAll(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test('rentalRecord successfully deleted', async done => {
    const rentalData = await RentalRecord.find();
    const event = {
      body: JSON.stringify({ rentalId: rentalData[0]._id }),
      httpMethod: 'DELETE',
    };

    const deleteRecord = await handler(event, {});

    expect(deleteRecord.statusCode).toBe(200);

    const newRentalData = await RentalRecord.find();
    const deletedRecord = await RentalRecord.findById(rentalData[0]._id);
    expect(deletedRecord).toBe(null);
    expect(newRentalData.length).toBe(rentalData.length - 1);

    done();
  });
});
