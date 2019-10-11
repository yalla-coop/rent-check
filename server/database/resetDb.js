const User = require("./models/User");
const RentalRecord = require("./models/RentalRecord");

const resetDB = async () => {
  try {
    await User.deleteMany();
    return RentalRecord.deleteMany();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("Error during resting the db, try again", err);
  }
};

module.exports = resetDB;
