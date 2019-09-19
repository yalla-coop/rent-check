import axios from 'axios';

// Postcodes :: Contents
// makePostcodeArray - takes an array of objects from airtable response and returns
//                     an array of just postcodes e.g. ["E8 3AB", "N4 1TD"]
// getGeolocation - takes array of postcodes and queries postcodes.io API for geolocation
//                  returns postcodes.io response (array of objects)
// makeLatLngArray - takes response from postcodes.io and returns a 2-dimensional array with
//                   lat and lng for each entry in the response. Where the input was not resolved
//                   to valid geolocation data, the string 'invalid' will be used instead.

export const makePostcodeArray = inputArray =>
  inputArray.map(entry => entry.postcode);

export const getGeolocation = postcodeArray =>
  new Promise((resolve, reject) => {
    axios
      .post('https://api.postcodes.io/postcodes', {
        postcodes: postcodeArray.slice(0, 100),
      })
      .then(body => resolve(body.result));
  });

export const makeLatLngArray = inputArray => {
  return inputArray.map(entry => {
    if (entry.result != null) {
      return [entry.result.latitude, entry.result.longitude];
    }
    return 'invalid';
  });
};
