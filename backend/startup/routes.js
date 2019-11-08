const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");
const priority = require("../routes/priority");
const issueType = require("../routes/issueType");
const status = require("../routes/status");
const project = require("../routes/project");

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());

  app.use("/priority", priority);
  app.use("/issue-type", issueType);
  app.use("/status", status);
  app.use("/project", project);

  // Error Handling middleware
  app.use(error);
};
