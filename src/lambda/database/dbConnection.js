import mongoose from 'mongoose';

require('dotenv').config();

let mongoURI = 'mongodb://localhost:27017/rent-check';

if (process.env.NODE_ENV === 'test') {
  // change mongoURI to testing database URI
  mongoURI = process.env.MONGOURI_TEST;
} else if (process.env.NODE_ENV === 'production') {
  // change mongoURI to testing database URI
  mongoURI = process.env.MONGO_URI_PROD;
}

console.log('mongURI', mongoURI);

const dbConnection = () =>
  mongoose.connect('mongodb://localhost:27017/rent-check', {
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
