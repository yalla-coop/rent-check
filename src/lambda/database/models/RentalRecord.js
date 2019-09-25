// import constants
import { statusEnum } from '../../../constants/rentalRecords';

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const schema = new mongoose.Schema({
  submittedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  status: {
    type: String,
    enum: statusEnum,
    required: true,
  },
  geoLocation: {
    type: String,
    required: true,
  },
  address: String,
  postcode: {
    type: String,
    required: true,
  },
  leaseLength: String,
  landlordTenantsAct: {
    type: String,
    enum: ['Yes', 'No', 'Not sure'],
  },
  lastRentReview: Date,
  nextRentReview: Date,
  landlord: String,
  specification: {
    type: String,
    enum: ['Refurbished', 'Shell', 'Other / Not sure'],
  },
  annualRent: Number,
  squareFeet: Number,
  priceSqFt: Number,
  serviceCharge: Number,
  useClass: {
    type: String,
    enum: ['A1', 'A3', 'B1', 'B2', 'B8', 'D1', 'D2', 'Other'],
  },
  restricted: {
    type: String,
    enum: ['Restricted', 'Unrestricted', 'Not sure'],
  },
  breakClauses: String,
  additionalComments: String,
});

const RentalRecord = model('rentalRecords', schema);

export default RentalRecord;
