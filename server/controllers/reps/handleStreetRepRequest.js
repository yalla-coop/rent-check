const connectToDatabase = require("../../database/dbConnection");
const { requestSuperUser } = require("../../database/queries/user");
const User = require("../../database/models/User");
// Stub - function to be replaced with one that gets ID of logged in user
const { roles, status } = require("../../constants/users");

const getCurrentUser = () => User.findOne({ status: "verified", role: "user" });

module.exports = async function handleStreetRepRequest(req, res) {
  try {
    await connectToDatabase();
  } catch (err) {
    return res.status(500).send({ msg: "Server error" });
  }
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return res
        .status(403)
        .send({ msg: "Please make sure you are logged in and try again" });
    }
    const isNotEligible =
      currentUser.role !== roles.USER || currentUser.status !== status.VERIFIED;
    if (isNotEligible) {
      return res.status(403).send({ msg: "Request not allowed" });
    }
    await requestSuperUser(currentUser._id);
    return res.status(200).send({
      msg:
        "Your request has been received, please speak to an existing street rep to continue your application.",
    });
  } catch (err) {
    console.log(`\n\n${err}\n\n`);
    return res.status(500).send({ msg: "Server error" });
  }
};
