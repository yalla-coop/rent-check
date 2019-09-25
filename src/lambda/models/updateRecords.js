/* eslint-disable no-return-await */
import Airtable from 'airtable';

import {
  makeLatLngArray,
  getGeolocation,
  makePostcodeArray,
} from './postcodes';

/* istanbul ignore next */
// eslint-disable-next-line no-nested-ternary
const apiKey = process.env.AIRTABLE_API_KEY
  ? process.env.AIRTABLE_API_KEY
  : process.env.NODE_ENV === 'production'
  ? null
  : 'keyTestValue';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey,
});
const base = Airtable.base(process.env.AIRTABLE_BASE);

// updateRecords :: Contents
//
// updateGeo - takes airtable response of records without geolocation (array of objects)
//            and updates them with latitude and longitude - adds to Airtable
// joinWithIds - used by updateGeo to join the airtable response object's IDs with the
//             latitude and longitude retrieved from the postcodes.io API
// updateAirtable - updates one row in Airtable, takes id and object of fields to update
// updateMany - takes array of multiple records to update

export const joinWithIDs = (airtableResponse, postcodeResponse) =>
  new Promise(resolve => {
    const updateArray = [];
    for (let i = 0; i < airtableResponse.length; i += 1) {
      updateArray[i] = {
        id: airtableResponse[i].id,
        fields: {
          geolocation: JSON.stringify(postcodeResponse[i]),
        },
      };
    }
    resolve(updateArray);
  });

export const updateAirtable = (id, fields) =>
  new Promise((resolve, reject) => {
    base('RENTCHECK').update(id, fields, (err, record) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error('error with Airtable module: ', err);
        reject(err);
      }
      resolve(record);
    });
  });

export const updateMany = array =>
  new Promise(resolve => {
    array.forEach(async row => await updateAirtable(row.id, row.fields));
    resolve(true);
  });

export const updateGeo = airtableResponse =>
  new Promise((resolve, reject) => {
    if (airtableResponse.length === 0) {
      resolve(0);
    } else {
      // convert input object to array of postcodes
      const postcodeArray = makePostcodeArray(airtableResponse);
      // get geolocation for each one
      getGeolocation(postcodeArray)
        .then(makeLatLngArray)
        // stitch ids and lat/lngs back together
        .then(latLng => joinWithIDs(airtableResponse, latLng))
        // update airtable
        .then(updateMany)
        .then(resolve)
        .catch(reject);
    }
  });
