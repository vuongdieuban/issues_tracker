const joi = require("joi");
const mongoose = require("mongoose");

const prioritySchema = new mongoose.Schema({
  name: String,
  level: Number
});

const Priority = mongoose.model("Priority", prioritySchema);

module.exports.Priority = Priority;
