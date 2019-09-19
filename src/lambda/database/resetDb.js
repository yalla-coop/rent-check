import mongoose from 'mongoose';

const resetDB = async () => {
  try {
    const { connection } = mongoose;
    const collections = await connection.db
      .listCollections({}, { nameOnly: true })
      .toArray();

    const promises = collections.map(({ name }) =>
      connection.dropCollection(name)
    );
    await Promise.all(promises);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error during resting the db, try again', err);
  }
};

export default resetDB;
