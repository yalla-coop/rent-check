/**
 * @jest-environment node
 */
const User = require("../../models/User");
const buildData = require("../../data/index");

const { deleteUser } = require("./index");

describe("test deleteUser query", () => {
  beforeEach(async done => {
    // build dummy data
    await buildData();
    done();
  });

  test("should delete User", async done => {
    const foundUser = await User.findOne();

    expect(foundUser).toBeDefined();
    expect(foundUser._id).toBeDefined();

    await deleteUser(foundUser._id);

    const deletedUser = await User.findById(foundUser._id);

    expect(deletedUser).toBe(null);

    expect(1 + 1).toBe(2);

    done();
  });
});
