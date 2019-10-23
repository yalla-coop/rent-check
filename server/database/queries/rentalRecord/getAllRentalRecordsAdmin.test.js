/**
 * @jest-environment node
 */

const buildData = require("../../data/index");

// import the query to test
const { getAllRentalRecordsAdmin } = require("./index");

describe("Test getAllData query for rental records", () => {
  beforeAll(async done => {
    // connect and build dummy data
    await buildData();
    done();
  });

  test("should get an array of rental records with attached user data", async done => {
    const foundRecords = await getAllRentalRecordsAdmin();
    expect(foundRecords).toBeDefined();
    expect(foundRecords.length).toBeGreaterThan(0);
    expect(foundRecords[0].submittedBy.email).toBeDefined();
    expect(foundRecords[0].status).toBeDefined();
    expect(foundRecords[0].geoLocation).toBeDefined();
    expect(foundRecords[0].postcode).toBeDefined();
    done();
  });
});
