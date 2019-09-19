import User from './models/users';
import RentalData from './models/rentalData';

const resetDB = async () => {
  try {
    await User.deleteMany();
    return RentalData.deleteMany();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error during resting the db, try again', err);
  }
};

export default resetDB;
