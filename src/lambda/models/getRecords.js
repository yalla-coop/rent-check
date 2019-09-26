/* eslint-disable camelcase */
import Airtable from 'airtable';
// Airtable configuration:

/* istanbul ignore next */
// eslint-disable-next-line no-nested-ternary
const apiKey = process.env.AIRTABLE_API_KEY
  ? process.env.AIRTABLE_API_KEY
  : process.env.NODE_ENV === 'production'
  ? null
  : 'keyTestValue';

if (!apiKey || !process.env.AIRTABLE_BASE)
  throw new Error('Airtable API key and base must be set');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey,
});
const base = Airtable.base(process.env.AIRTABLE_BASE);

// getRecords :: Contents:

// getNoGeo - retrieve all records from Airtable which are missing geolocation
// isValidRow - checks that row contains all the vital info to be displayed
// getAllValidRows - retrieves all rows with valid data from Airtable
// requestRows - takes 2 arguments - airtable view and callback to be performed on
//               each record.Returns an array of objects

export const getNoGeo = () =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line no-use-before-define
    requestRows('no_geolocation', (array, record) => {
      // if (record.fields.postcode != null) {
      const postcodeIdObj = {
        id: record.id,
        postcode: record.fields.postcode,
      };
      array.push(postcodeIdObj);
      // }
    })
      .then(resolve)
      .catch(reject);
  });

const isValidRow = ({
  fields: {
    postcode,
    price_sqft,
    use_class,
    date_of_last_rent_review,
    geolocation,
  },
}) => {
  if (
    postcode &&
    price_sqft &&
    use_class &&
    date_of_last_rent_review &&
    geolocation &&
    geolocation !== 'invalid'
  ) {
    return true;
  }
  return false;
};

export const getAllValidRows = () =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line no-use-before-define
    requestRows('valid_records', (array, record) => {
      if (isValidRow(record)) {
        array.push(record.fields);
      }
    })
      .then(resolve)
      .catch(reject);
  });

export const requestRows = (view, cb) =>
  new Promise(resolve => {
    const outputArray = [];
    base('RENTCHECK')
      .select({
        maxRecords: 1000,
        pageSize: 100,
        view,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
          records.forEach(record => {
            cb(outputArray, record);
          });
          fetchNextPage();
        },
        function done(err) {
          // eslint-disable-next-line no-console
          if (err) console.error(err);
          // console.log(outputArray);
          resolve(outputArray);
        }
      );
  });
