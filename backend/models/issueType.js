const Joi = require("joi");
const mongoose = require("mongoose");

const issueTypeSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

issueTypeSchema.statics.validate = function(data) {
  const schema = {
    name: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

const IssueType = mongoose.model("IssueType", issueTypeSchema);

module.exports.IssueType = IssueType;
