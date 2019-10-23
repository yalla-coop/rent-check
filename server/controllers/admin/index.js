const express = require("express");
const { getUsers, updateUser } = require("./users");
const {
  addLocations,
  deleteLocations,
  getLocations,
  updateLocations,
} = require("./locations");
const admin = express.Router();

admin.get("/users", getUsers);
admin.patch("/users", updateUser);

admin.get("/locations", getLocations);

module.exports = admin;
