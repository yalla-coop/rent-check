const express = require("express");
const { getUsers, updateUser, deleteUsers } = require("./users");
const {
  deleteLocations,
  getLocations,
  updateLocations,
  getSuperUserRecords,
} = require("./locations");

const admin = express.Router();

admin.get("/users", getUsers);
admin.patch("/users", updateUser);
admin.delete("/users", deleteUsers);

admin.get("/users/current/locations", getSuperUserRecords);

admin.get("/locations", getLocations);
admin.delete("/locations", deleteLocations);
admin.patch("/locations", updateLocations);

module.exports = admin;
