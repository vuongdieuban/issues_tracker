const Joi = require("joi");
const mongoose = require("mongoose");
const { Project } = require("./project");
const { IssueType } = require("./issueType");
const { Priority } = require("./priority");
const { Status } = require("./status");
const { User } = require("./user");

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

issueSchema.statics.validate = function(data) {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    project: Joi.objectId().required(),
    issueType: Joi.objectId().required(),
    priority: Joi.objectId().required(),
    openBy: Joi.objectId().required(),
    status: Joi.objectId().required()
  };
  return Joi.validate(data, schema);
};

// middleware to validate the incoming data before save to ensure everything exists
issueSchema.pre("save", async function() {
  const validation = [
    [Project, "project"],
    [IssueType, "issueType"],
    [Priority, "priority"],
    [User, "openBy"],
    [Status, "status"]
  ];

  const data = await Promise.all(
    validation.map(v => {
      const Model = v[0];
      const path = v[1];
      return Model.findOne({ _id: this[path] });
    })
  );
  if (data.includes(null))
    throw new Error("One or more of the field id does not exist");
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports.Issue = Issue;
