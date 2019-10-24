const mongoose = require("mongoose");

// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();

let mongoURI = process.env.MONGO_URI;

if (process.env.NODE_ENV === "test") {
  // change mongoURI to testing database URI
  mongoURI = process.env.MONGOURI_TEST;
}

const dbConnection = () =>
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
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
      console.log("connection err", err);
      throw err;
    });
}

module.exports = connectToDatabase;
