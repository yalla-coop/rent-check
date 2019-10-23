/**
 * @jest-environment node
 */
const User = require("../../models/User");
const buildData = require("../../data/index");
const { roles, status } = require("../../../constants/users");

const { getAdminUserId, getUser } = require("./index");

describe("getUser looks up a user based on ID", () => {
  beforeEach(async done => {
    // build dummy data
    await buildData();
    done();
  });

  it("returns an ID for a user with admin role", async done => {
    const adminID = await getAdminUserId();
    const adminUser = await getUser(adminID);
    expect(adminUser.role).toEqual(roles.ADMIN);
    done();
  });
});
