
const { getNoGeo, getAllValidRows } = require("./models/getRecords");
const { updateGeo } = require("./models/updateRecords");

export async function handler(event, context) {
  try {
    const rowsWithNoGeolocation = await getNoGeo();
    updateGeo(rowsWithNoGeolocation);
    const locations = await getAllValidRows();
    return {
      statusCode: 200,
      body: JSON.stringify(locations),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}