const express = require("express");
const { getLocations, addLocation } = require("./locations");

const getSuperUserUsers = require("./getSuperUserUsers");
const admin = require("./admin");

const router = express.Router();

router.get("/locations", getLocations);
router.post("/locations", addLocation);

router.get("/superuser/:id/records", getSuperUserUsers);

router.use("/admin", admin);

module.exports = router;
