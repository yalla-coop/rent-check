const express = require("express");
const { getLocations, addLocation } = require("./locations");
const buildData = require("../database/data/demoBuild");

const { getReps, handleStreetRepRequest } = require("./reps");
const admin = require("./admin");

const router = express.Router();
if (process.env.DEMO_MODE) {
  router.get("/rebuild", async (req, res) => {
    await buildData();
    res.send("done");
  });
}

router.get("/locations", getLocations);
router.post("/locations", addLocation);

router.get("/reps", getReps);
router.post("/reps", handleStreetRepRequest);

router.use("/admin", admin);

module.exports = router;
