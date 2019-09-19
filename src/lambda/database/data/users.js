import User from '../models/users';

export default () => {
  const users = [
    {
      name: 'abdalsamad',
      email: 'abdalsamad.y.m@gmail.com',
    },
    {
      name: 'Farah',
      email: 'farah@test.coms',
    },
    {
      name: 'Joe',
      email: 'joe@test.com',
    },
  ];

  return User.create(users);
};
