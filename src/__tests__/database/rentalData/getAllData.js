/**
 * @jest-environment node
 */

import buildData from '../../../lambda/database/data/index';

// import the query to test
import { getAllData } from '../../../lambda/database/queries/rentalRecord';

describe('Test getAllData query for rental records', () => {
  beforeAll(async done => {
    // connect and build dummy data
    await buildData();
    done();
  });

  test('should get an array of rental records', async done => {
    const foundRecords = await getAllData();

    expect(foundRecords).toBeDefined();
    expect(foundRecords.length).toBeGreaterThan(0);
    expect(foundRecords[0].submittedBy).toBeDefined();
    expect(foundRecords[0].status).toBeDefined();
    expect(foundRecords[0].geoLocation).toBeDefined();
    expect(foundRecords[0].postcode).toBeDefined();
    done();
  });
});
