const express = require("express");
const { getUsers, updateUser, deleteUsers } = require("./users");
const {
  addLocations,
  deleteLocations,
  getLocations,
  updateLocations
} = require("./locations");
const admin = express();

admin.get("/users", getUsers);
admin.patch("/users", updateUser);
admin.delete("/users", deleteUsers);

admin.get("/locations", getLocations);

module.exports = admin;
