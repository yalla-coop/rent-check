const express = require("express");
const { addUsers, deleteUsers, getUsers, updateUsers } = require("./users");
const admin = express();

admin.get("/users", getUsers);

module.exports = admin;
