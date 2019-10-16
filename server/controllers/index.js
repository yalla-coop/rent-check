const express = require("express");
const { getLocations, addLocation } = require("./locations");
const admin = require("./admin");
const router = express();

router.get("/locations", getLocations);
router.post("/locations", addLocation);

router.use("/admin", admin);

module.exports = router;
