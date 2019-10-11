const express = require("express");

const { getLocations, addLocations } = require("./locations");

const router = express();

router.get("/", (req, res) => {
  res.send("index");
});

router.get("/locations", getLocations);
router.post("/locations", addLocations);

module.exports = router;
