const joi = require("joi");
const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  name: String
});

const Status = mongoose.model("Status", statusSchema);

module.exports.Status = Status;
