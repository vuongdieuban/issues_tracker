const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");
const priority = require("../routes/priority");

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());

  app.use("/priority", priority);

  // Error Handling middleware
  app.use(error);
};
