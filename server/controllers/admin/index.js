const express = require("express");
const { addUsers, deleteUsers, getUsers, updateUsers } = require("./users");
const {
  addLocations,
  deleteLocations,
  getLocations,
  updateLocations,
} = require("./locations");
const admin = express();

admin.get("/users", getUsers);

admin.get("/locations", getLocations);

module.exports = admin;
