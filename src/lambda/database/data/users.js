import User from '../models/User';

// import constants
import { roles, status } from '../../../constants/users';

export default () => {
  const users = [
    {
      name: 'abdalsamad',
      email: 'abdalsamad.y.m@gmail.com',
      role: roles.USER,
      status: status.UNVERIFIED,
    },
    {
      name: 'Farah',
      email: 'farah@test.coms',
      role: roles.SUPERUSER,
      status: status.VERIFIED,
      companyName: 'Test',
      companyAddress: {
        addressLine1: 'Block 101 Test',
        addressLine2: '1 Test Street',
        city: 'London',
        postcode: 'T3 5TT',
      },
    },
    {
      name: 'Joe',
      email: 'joe@test.com',
      role: roles.ADMIN,
      status: status.VERIFIED,
    },
  ];

  return User.create(users);
};
