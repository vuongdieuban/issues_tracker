const joi = require("joi");
const mongoose = require("mongoose");

const issueTypeSchema = new mongoose.Schema({
  name: String
});

const IssueType = mongoose.model("IssueType", issueTypeSchema);

module.exports.IssueType = IssueType;
