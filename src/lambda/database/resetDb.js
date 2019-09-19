import User from './models/users';

const resetDB = async () => {
  try {
    return User.deleteMany();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error during resting the db, try again', err);
  }
};

export default resetDB;
