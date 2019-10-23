const express = require("express");
const { getLocations, addLocation } = require("./locations");
const { getReps, handleStreetRepRequest } = require("./reps");
const admin = require("./admin");
const router = express.Router();

router.get("/locations", getLocations);
router.post("/locations", addLocation);

router.get("/reps", getReps);
router.post("/reps", handleStreetRepRequest);

router.use("/admin", admin);

module.exports = router;
