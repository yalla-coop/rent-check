const express = require("express");
const { getLocations, addLocation } = require("./locations");

const getSuperUserRecords = require("./locations/getSuperUserRecords");
const admin = require("./admin");

const router = express.Router();

router.get("/locations", getLocations);
router.post("/locations", addLocation);

router.get("/rep/:id/records", getSuperUserRecords);

router.use("/admin", admin);

module.exports = router;
