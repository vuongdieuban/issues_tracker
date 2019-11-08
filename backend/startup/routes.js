const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");
const priority = require("../routes/priority");
const issueType = require("../routes/issueType");
const status = require("../routes/status");
const project = require("../routes/project");
const issue = require("../routes/issue");

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());

  app.use("/priorities", priority);
  app.use("/issue-types", issueType);
  app.use("/statuses", status);
  app.use("/projects", project);
  app.use("/issues", issue);

  // Error Handling middleware
  app.use(error);
};
