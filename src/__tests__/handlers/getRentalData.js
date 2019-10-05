/**
 * @jest-environment node
 */
import buildData from '../../lambda/database/data/index';

// import handler to test
import { handler } from '../../lambda/getRentalData';

describe('Test getRentalData handler', () => {
  beforeAll(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test('rental records should be found', async done => {
    const rentalRecords = await handler(null, {});
    expect(rentalRecords.statusCode).toBe(200);

    const parsedRentalRecords = JSON.parse(rentalRecords.body);

    expect(parsedRentalRecords).toBeDefined();
    expect(parsedRentalRecords.length).toBeGreaterThan(0);
    expect(parsedRentalRecords[0].submittedBy).toBeDefined();
    expect(parsedRentalRecords[0].geoLocation).toBeDefined();
    expect(parsedRentalRecords[0].status).toBeDefined();

    done();
  });
});
