import dbConnection from '../dbConnection';
import resetDb from '../resetDb';
import users from './users';
import rentalRecords from './rentalRecords';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const buildData = () =>
  dbConnection().then(async () => {
    try {
      await resetDb();
      await users();
      await rentalRecords();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err during building the test db, try again', err);
      throw err;
    }
  });

export default buildData;
