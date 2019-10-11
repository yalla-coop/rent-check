const User = require("../models/User");

// import constants
const { roles, status } = require("../../constants/users");

module.exports = async function populateUsers() {
  // create initial admin user
  const admin = [
    {
      name: "Krissie Nicholson",
      email: "admin@test.com",
      role: roles.ADMIN,
      status: status.VERIFIED,
    },
  ];

  await User.create(admin);
  const storedAdmin = await User.findOne({ role: roles.ADMIN });

  // create super user and one waiting to be granted super user status
  const superUsers = [
    {
      name: "Farah Zaqout",
      email: "farah@test.coms",
      role: roles.SUPERUSER,
      status: status.VERIFIED,
      companyName: "Test",
      companyAddress: {
        addressLine1: "Block 101 Test",
        addressLine2: "1 Test Street",
        city: "London",
        postcode: "E4 5TT",
      },
      verifiedBy: storedAdmin._id,
      grantedSuperBy: storedAdmin._id,
    },
    {
      name: "Michael Watts",
      email: "michael@test2.coms",
      role: roles.USER,
      status: status.AWAITING_SUPER,
      companyName: "Michael Company",
      companyAddress: {
        addressLine1: "22 Watts Lane",
        city: "London",
        postcode: "E3 8KP",
      },
      verifiedBy: storedAdmin._id,
    },
    {
      name: "Chloe Moore",
      email: "chloemoore@test2.com",
      role: roles.USER,
      status: status.AWAITING_SUPER,
      companyName: "Moore Company",
      companyAddress: {
        addressLine1: "212 Moore Lane",
        city: "London",
        postcode: "E3 8KP",
      },
      verifiedBy: storedAdmin._id,
    },
  ];

  await User.create(superUsers);
  const verifiedSuperUser = await User.findOne({ role: roles.SUPERUSER });

  const users = [
    {
      name: "Abdalsamad Abumusameh",
      email: "abdalsamad.y.m@gmail.com",
      role: roles.USER,
      status: status.UNVERIFIED,
    },
    {
      name: "Simon Dupree",
      email: "simon@test.co.uk",
      role: roles.USER,
      status: status.VERIFIED,
      companyName: "Simon Inc",
      companyAddress: {
        addressLine1: "98 Austria Road",
        city: "London",
        postcode: "E2 5NM",
      },
      verifiedBy: storedAdmin._id,
    },
    {
      name: "Joe",
      email: "joe@test.com",
      role: roles.USER,
      status: status.VERIFIED,
      verifiedBy: verifiedSuperUser._id,
    },

    // unverified
    {
      name: "Adam Michaels",
      email: "micahels@gmail.com",
      role: roles.USER,
      status: status.UNVERIFIED,
    },
    {
      name: "Susan Hitchie",
      email: "susan@gmail.com",
      role: roles.USER,
      status: status.UNVERIFIED,
    },
  ];

  return User.create(users);
};
