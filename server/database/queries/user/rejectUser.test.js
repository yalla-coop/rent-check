/**
 * @jest-environment node
 */
const User = require("../../models/User");
const buildData = require("../../data/index");
const { status } = require("../../../constants/users");

const { rejectUser } = require("./index");

describe("rejectUser updates user status", () => {
  beforeEach(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test("rejectUser", async done => {
    const userRequest = await User.findOne({
      status: status.UNVERIFIED,
    });

    rejectUser(userRequest._id).then(updatedUser => {
      expect(updatedUser).toBeDefined();
      expect(updatedUser.status).toBe(status.REJECTED);
      done();
    });
  });
});
