import User from './models/User';

const resetDB = async () => {
  try {
    return User.deleteMany();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error during resting the db, try again', err);
  }
};

export default resetDB;
