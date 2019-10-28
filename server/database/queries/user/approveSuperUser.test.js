/**
 * @jest-environment node
 */
const User = require("../../models/User");
const buildData = require("../../data/index");
const { roles, status } = require("../../../constants/users");

const { approveSuperUser } = require("./index");

describe("approveSuperUser updates user status", () => {
  beforeEach(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test("approveSuperUser", async done => {
    const superUserRequest = await User.findOne({
      status: status.AWAITING_SUPER,
    });

    const adminUser = await User.findOne({
      role: roles.ADMIN,
    });

    approveSuperUser(superUserRequest._id, adminUser._id).then(updatedUser => {
      expect(updatedUser).toBeDefined();
      expect(updatedUser.status).toBe(status.VERIFIED);
      expect(updatedUser.role).toBe(roles.SUPERUSER);
      expect(updatedUser.grantedSuperBy.toString()).toBe(
        adminUser._id.toString(),
      );
      done();
    });
  });
});
