/**
 * @jest-environment node
 */
const User = require("../../models/User");
const buildData = require("../../data/index");
const { roles, status } = require("../../../constants/users");

const { requestSuperUser } = require("./index");

describe("requestSuperUser updates user status", () => {
  beforeEach(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test("request Super User", async done => {
    const userRequest = await User.findOne({
      status: status.VERIFIED,
      role: roles.USER,
    });

    requestSuperUser(userRequest._id).then(updatedUser => {
      expect(updatedUser).toBeDefined();
      expect(updatedUser.status).toBe(status.AWAITING_SUPER);
      done();
    });
  });
});
