const moment = require("moment");
const faker = require("faker");
const { parse, transform } = require("csv");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const RentalRecord = require("../models/RentalRecord");
const dbConnect = require("../dbConnection");

const {
  statusEnum,
  landlordTenantsActEnum,
  restrictedEnum,
  specificationEnum,
  useClassEnum,
} = require("../../constants/rentalRecords");

const leaseLength = [
  "60 Months",
  "5 years",
  "20 years",
  "25 months",
  "2 years",
  "3 hours",
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const readStream = fs.createReadStream(
  path.join(__dirname, "postcodes3000dup.csv")
);

const parser = parse({
  delimiter: ",",
});

(async () => {
  await dbConnect();
  const admin = await User.findOne({ role: "admin" });
  const transformer = transform(
    record => {
      const annualRent = parseInt(faker.finance.amount(3000, 120000), 10);
      const priceSqFt = parseInt(faker.finance.amount(5, 60), 10);
      const rec = {
        submittedBy: admin._id,
        postcode: record[0],
        geoLocation: {
          type: "Point",
          coordinates: [record[2], record[1]],
        },
        status: statusEnum[getRandomInt(statusEnum.length)],
        address: `${record[4]},${record[5]}`,
        leaseLength: leaseLength[getRandomInt(leaseLength.length)],
        landlordTenantsAct:
          landlordTenantsActEnum[getRandomInt(landlordTenantsActEnum.length)],
        lastRentReview: moment(faker.date.past(2))
          .format("YYYY-MM-DD")
          .toString(),
        nextRentReview: moment(faker.date.future(2))
          .format("YYYY-MM-DD")
          .toString(),
        annualRent,
        squareFeet: annualRent / priceSqFt,
        priceSqFt,
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
        console.log("done");
      } catch (errr) {
        // eslint-disable-next-line no-console
        console.log("err", errr);
      }
      process.exit(0);
    }
  );
  readStream.pipe(parser).pipe(transformer);
})();
