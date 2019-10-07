import moment from 'moment';
import faker from 'faker';
import { parse, transform } from 'csv';
import fs from 'fs';
import path from 'path';
import User from '../models/User';
import RentalRecord from '../models/RentalRecord';
import dbConnect from '../dbConnection';

import {
  statusEnum,
  landlordTenantsActEnum,
  restrictedEnum,
  specificationEnum,
  useClassEnum,
} from '../../../constants/rentalRecords';

const laseLength = [
  '60 Months',
  '5 years',
  '20 years',
  '25 months',
  '2 years',
  '3 hours',
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const readStearm = fs.createReadStream(path.join(__dirname, 'postcodes.csv'));

const parser = parse({
  delimiter: ',',
});

(async () => {
  await dbConnect();
  const admin = await User.findOne({ role: 'admin' });
  const transformer = transform(
    record => {
      const rec = {
        submittedBy: admin._id,
        postcode: record[0],
        geoLocation: {
          type: 'Point',
          coordinates: [record[2], record[1]],
        },
        status: statusEnum[getRandomInt(statusEnum.length)],
        address: `${record[4]},${record[5]}`,
        leaseLength: laseLength[getRandomInt(laseLength.length)],
        landlordTenantsAct:
          landlordTenantsActEnum[getRandomInt(landlordTenantsActEnum.length)],
        lastRentReview: moment(faker.date.past(2))
          .format('YYYY-MM-DD')
          .toString(),
        nextRentReview: moment(faker.date.future(2))
          .format('YYYY-MM-DD')
          .toString(),
        annualRent: parseInt(faker.finance.amount(10000, 1000000), 10),
        squareFeet: 550,
        priceSqFt: parseInt(faker.finance.amount(320, 9000), 10),
        serviceCharge: parseInt(faker.finance.amount(10, 500), 10),
        useClass: useClassEnum[getRandomInt(useClassEnum.length)],
        specification:
          specificationEnum[getRandomInt(specificationEnum.length)],
        restricted: restrictedEnum[getRandomInt(restrictedEnum.length)],
        landlord: faker.name.findName(),
        additionalComments: faker.lorem.sentences(2),
      };
      return rec;
    },
    async (err, output) => {
      output.shift();
      try {
        await RentalRecord.create(output);
        // eslint-disable-next-line no-console
        console.log('done');
      } catch (errr) {
        // eslint-disable-next-line no-console
        console.log('err', errr);
      }
      process.exit(0);
    }
  );
  readStearm.pipe(parser).pipe(transformer);
})();
