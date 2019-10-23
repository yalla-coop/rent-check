const User = require("./models/User");
const RentalRecord = require("./models/RentalRecord");

const resetDB = async () => {
  try {
    await User.deleteMany();
    await RentalRecord.deleteMany();
    return;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log("Error during database reset, try again", err);
  }
};

module.exports = resetDB;
