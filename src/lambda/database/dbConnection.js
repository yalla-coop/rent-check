import mongoose from 'mongoose';

require('dotenv').config();

const dbConnection = () =>
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

let cachedDb = null;

// use existed db conneciton if found else create new one
function connectToDatabase() {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  return dbConnection()
    .then(db => {
      cachedDb = db;
      return cachedDb;
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log('connection err', err);
      throw err;
    });
}

export default connectToDatabase;
