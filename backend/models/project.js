const joi = require("joi");
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Issue" }]
});

const Project = mongoose.model("Project", projectSchema);

module.exports.Project = Project;
