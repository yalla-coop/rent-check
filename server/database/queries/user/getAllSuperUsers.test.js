/**
 * @jest-environment node
 */
const User = require("../../models/User");
const buildData = require("../../data/index");
const { roles, status } = require("../../../constants/users");
const { getAllSuperUsers } = require("./index");

describe("getAllSuperUsers", () => {
  beforeEach(async done => {
    // build dummy data
    await buildData();
    done();
  });

  it("returns only super users", async done => {
    const superUsers = await getAllSuperUsers();
    expect(superUsers).toBeDefined();
    expect(superUsers[0].role).toBe(roles.SUPERUSER);
    done();
  });
});
