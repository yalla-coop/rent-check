/**
 * @jest-environment node
 */
const User = require("../../models/User");
const buildData = require("../../data/index");
const { roles, status } = require("../../../constants/users");

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
