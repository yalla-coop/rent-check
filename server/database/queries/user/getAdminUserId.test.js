/**
 * @jest-environment node
 */
const buildData = require("../../data/index");
const { roles } = require("../../../constants/users");

const { getAdminUserId, getUser } = require("./index");

describe("getAdminUserId returns a valid admin user's ID", () => {
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
