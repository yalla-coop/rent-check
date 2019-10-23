/**
 * @jest-environment node
 */
const User = require("../../models/User");
const buildData = require("../../data/index");
const { roles, status } = require("../../../constants/users");

const { rejectSuperUser } = require("../../queries/user");

describe("rejectSuperUser updates user status", () => {
  beforeEach(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test("rejectSuperUser", async done => {
    const superUserRequest = await User.findOne({
      status: status.AWAITING_SUPER,
    });

    rejectSuperUser(superUserRequest._id).then(updatedUser => {
      expect(updatedUser).toBeDefined();
      expect(updatedUser.status).toBe(status.VERIFIED);
      done();
    });
  });
});
