const Joi = require("joi");
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Issue" }]
});

projectSchema.statics.validate = function(data) {
  const schema = {
    name: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

const Project = mongoose.model("Project", projectSchema);

module.exports.Project = Project;
