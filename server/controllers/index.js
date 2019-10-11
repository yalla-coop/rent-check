const express = require("express");

const { getLocations } = require("./locations");

const router = express();

router.get("/", (req, res) => {
  res.send("index");
});

router.get("/locations", getLocations);

module.exports = router;
