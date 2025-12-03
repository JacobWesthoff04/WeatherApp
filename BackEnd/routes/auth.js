const express = require("express");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const router = express.Router();

// GET /api/weather?zip=<zip>
router.get("/", async (req, res) => {
  const { zip } = req.query;
  console.log("Fetching weather for ZIP:", zip);

  if (!zip) return res.sendStatus(400);

  const urlStart = "https://api.openweathermap.org/data/2.5/weather";
  const APIkey = "76b4b33ef3305218819b6eb032521f1a";
  const query = `zip=${zip},US&units=imperial&appid`;
  const url = `${urlStart}?${query}=${APIkey}`;

  try {
    const response = await fetch(url);
    const results = await response.json();
    res.send(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
