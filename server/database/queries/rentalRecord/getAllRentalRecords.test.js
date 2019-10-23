/**
 * @jest-environment node
 */

const buildData = require("../../data/index");

// import the query to test
const { getAllRentalRecords } = require("./index");

describe("getAllRentalRecords gets records but no user data", () => {
  beforeAll(async done => {
    // connect and build dummy data
    await buildData();
    done();
  });

  test("should get an array of rental records without attached user data", async done => {
    const foundRecords = await getAllRentalRecords();

    expect(foundRecords).toBeDefined();
    expect(foundRecords.length).toBeGreaterThan(0);
    expect(foundRecords[0].submittedBy.email).not.toBeDefined();
    expect(foundRecords[0].status).toBeDefined();
    expect(foundRecords[0].geoLocation).toBeDefined();
    expect(foundRecords[0].postcode).toBeDefined();
    done();
  });
});
