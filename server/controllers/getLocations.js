const { getNoGeo, getAllValidRows } = require('../database/getRecords');
const { updateGeo } = require('../database/updateRecords');

module.exports = async (req, res) => {
  const rowsWithNoGeolocation = await getNoGeo();
  updateGeo(rowsWithNoGeolocation);
  const locations = await getAllValidRows();
  res.send(locations);
};
