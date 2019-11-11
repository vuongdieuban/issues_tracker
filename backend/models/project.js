const Joi = require("joi");
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  languages: { type: String, required: true },
  date: { type: Date, default: Date.now() }
});

projectSchema.statics.validate = function(data) {
  const schema = {
    name: Joi.string().required(),
    summary: Joi.string().required(),
    languages: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

const Project = mongoose.model("Project", projectSchema);

module.exports.Project = Project;
