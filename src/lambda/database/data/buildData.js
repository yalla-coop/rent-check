import mongoose from 'mongoose';
import buildData from './index';

if (process.env.NODE_ENV === 'build') {
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
}
