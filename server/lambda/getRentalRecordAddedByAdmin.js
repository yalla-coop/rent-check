import User from "./database/models/User";
import connectToDatabase from "./database/dbConnection";

// import db query
import { getRentalRecordsByUserId } from "./database/queries/rentalRecord";

// Stub - function to be replaced with one that gets ID of logged in user
const getCurrentUser = () => User.findOne({ name: "Krissie Nicholson" });

export async function handler(event, context) {
  // eslint-disable-next-line no-param-reassign
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const user = await getCurrentUser();
    const rentalRecordsByAdmin = await getRentalRecordsByUserId(user.id);
    return {
      statusCode: 200,
      body: JSON.stringify(rentalRecordsByAdmin)
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: "Internal server error" })
    };
  }
}
