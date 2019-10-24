const connectToDatabase = require("../../database/dbConnection");
const { getAllSuperUsers } = require("../../database/queries/user");

module.exports = async function getReps(req, res) {
  try {
    await connectToDatabase();
    const reps = await getAllSuperUsers();
    // map received data to remove rep user IDs from public list of data
    const publicRepsData = reps.map(rep => {
      return {
        name: rep.name,
        companyName: rep.companyName,
        companyAddress: rep.companyAddress,
      };
    });
    res.status(200).send(publicRepsData);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
