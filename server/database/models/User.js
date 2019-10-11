const { roleEnum, statusEnum } = require("../../constants/users");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
    max: 100,
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: true,
  },
  role: {
    type: String,
    enum: roleEnum,
    required: true,
  },
  status: {
    type: String,
    enum: statusEnum,
    required: true,
  },
  companyName: String,
  companyAddress: {
    addressLine1: {
      type: String,
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
    },
    postcode: {
      type: String,
    },
  },
  verifiedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  grantedSuperBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const User = model("users", schema);

module.exports = User;
