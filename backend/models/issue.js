const Joi = require("joi");
const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  issueType: { type: mongoose.Schema.Types.ObjectId, ref: "IssueType" },
  priority: { type: mongoose.Schema.Types.ObjectId, ref: "Priority" },
  openBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: mongoose.Schema.Types.ObjectId, ref: "Status" },
  date: { type: Date, default: Date.now() }
});

// TODO: Add validation of openBy after create User
issueSchema.statics.validate = function(data) {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    project: Joi.objectId().required(),
    issueType: Joi.objectId().required(),
    priority: Joi.objectId().required(),
    status: Joi.objectId().required()
  };
  return Joi.validate(data, schema);
};

const Issue = mongoose.model("Issue", issueSchema);

module.exports.Issue = Issue;
