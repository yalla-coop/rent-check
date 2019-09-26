// import constants
import * as rentEnum from '../../../constants/rentalRecords';

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
    enum: rentEnum.statusEnum,
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
    enum: rentEnum.landlordTenantsActEnum,
  },
  lastRentReview: Date,
  nextRentReview: Date,
  landlord: String,
  specification: {
    type: String,
    enum: rentEnum.specificationEnum,
  },
  annualRent: Number,
  squareFeet: Number,
  priceSqFt: Number,
  serviceCharge: Number,
  useClass: {
    type: String,
    enum: rentEnum.useClassEnum,
  },
  restricted: {
    type: String,
    enum: rentEnum.restrictedEnum,
  },
  breakClauses: String,
  additionalComments: String,
});

const RentalRecord = model('rentalRecords', schema);

export default RentalRecord;
