import mongoose from 'mongoose';
import dbConnection from '../dbConnection';
import resetDb from '../resetDb';
import users from './users';

require('dotenv').config();

const buildData = () =>
  dbConnection().then(async () => {
    try {
      await resetDb();
      await users();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err during building the test db, try again', err);
      throw err;
    }
  });

buildData()
  .then(async () => {
    // eslint-disable-next-line no-console
    console.log('Done!: Dev DB has been built successfully');
    // close the connection after build
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log('err', err);
  });