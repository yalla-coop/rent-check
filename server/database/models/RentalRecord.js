// import constants
const mongoose = require("mongoose");
const rentEnum = require("../../constants/rentalRecords");

const { Schema, model } = mongoose;

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const schema = new mongoose.Schema(
  {
    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      enum: rentEnum.statusEnum,
      required: true,
    },
    geoLocation: {
      type: pointSchema,
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
      required: true,
    },
    lastRentReview: {
      type: Date,
      required: true,
    },
    nextRentReview: {
      type: Date,
      required: true,
    },
    landlord: String,
    specification: {
      type: String,
      enum: rentEnum.specificationEnum,
      required: true,
    },
    annualRent: {
      type: Number,
      required: true,
    },
    squareFeet: {
      type: Number,
      required: true,
    },
    priceSqFt: {
      type: Number,
      required: true,
    },
    serviceCharge: Number,
    useClass: {
      type: String,
      enum: rentEnum.useClassEnum,
      required: true,
    },
    restricted: {
      type: String,
      enum: rentEnum.restrictedEnum,
      required: true,
    },
    breakClauses: String,
    additionalComments: String,
  },
  { timestamps: true },
);

const RentalRecord = model("rentalRecords", schema);

module.exports = RentalRecord;
