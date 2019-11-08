const Joi = require("joi");
const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  issueType: { type: mongoose.Schema.Types.ObjectId, ref: "IssueType" },
  priority: { type: mongoose.Schema.Types.ObjectId, ref: "Priority" },
  openBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: mongoose.Schema.Types.ObjectId, ref: "Status" },
  date: { type: Date, default: Date.now() }
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports.Issue = Issue;
