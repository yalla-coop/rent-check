// import constants
import { statusEnum } from '../../../constants/rentalData';

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

// This should be rewritten with the new full schema
const schema = new mongoose.Schema({
  submittedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  status: {
    type: String,
    enum: statusEnum,
    required: true,
  },
  address: String,
  postcode: String,
  leaseLength: String,
  landlordTenantsAct: {
    type: String,
    enum: ['Yes', 'No', "Don't Know"],
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
    enum: ['Restricted', 'Unrestricted', "Don't know"],
  },
  breakClauses: String,
  geoLocation: {
    type: String,
    required: true,
  },
});

const RentalData = model('rentalData', schema);

export default RentalData;
