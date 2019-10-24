const connectToDatabase = require("../../database/dbConnection");
const { requestSuperUser } = require("../../database/queries/user");
const User = require("../../database/models/User");
// Stub - function to be replaced with one that gets ID of logged in user
const { roles, status } = "../../constants/users";
const getCurrentUser = () => User.findOne({ status: "verified", role: "user" });

module.exports = async function handleStreetRepRequest(req, res) {
  const currentUser = await getCurrentUser();
  try {
    await requestSuperUser(currentUser._id);
    res.status(200).send({
      msg:
        "Your request has been received. Please speak to a Street Rep to continue",
    });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};
