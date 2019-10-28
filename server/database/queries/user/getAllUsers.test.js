/**
 * @jest-environment node
 */
const buildData = require("../../data/index");

const { getAllUsers } = require("./index");

describe("getAllUsers", () => {
  beforeEach(async done => {
    // build dummy data
    await buildData();
    done();
  });

  it("returns users", async done => {
    const users = await getAllUsers();
    expect(users).toBeDefined();
    done();
  });
});
