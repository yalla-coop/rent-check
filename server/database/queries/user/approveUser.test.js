/**
 * @jest-environment node
 */
const User = require("../../models/User");
const buildData = require("../../data/index");
const { roles, status } = require("../../../constants/users");

const { approveUser } = require("./index");

describe("approveUser updates user status", () => {
  beforeEach(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test("approveUser", async done => {
    const userRequest = await User.findOne({
      status: status.UNVERIFIED,
    });

    const adminUser = await User.findOne({
      role: roles.ADMIN,
    });

    approveUser(userRequest._id, adminUser._id).then(updatedUser => {
      expect(updatedUser).toBeDefined();
      expect(updatedUser.status).toBe(status.VERIFIED);
      expect(updatedUser.verifiedBy.toString()).toBe(adminUser._id.toString());
      done();
    });
  });
});
