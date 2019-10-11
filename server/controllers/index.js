const express = require("express");
const { getLocations, addLocations } = require("./locations");
const admin = require("./admin");
const router = express();

router.get("/locations", getLocations);
router.post("/locations", addLocations);

router.use("/admin", admin);

module.exports = router;
