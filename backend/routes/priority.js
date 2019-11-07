const express = require("express");
const router = express.Router();
const Priority = require("../models/priority");

router.get("/", async (req, res) => {
  res.json("hello from priority");
});

module.exports = router;
