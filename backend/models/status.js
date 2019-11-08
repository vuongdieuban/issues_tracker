const Joi = require("joi");
const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

statusSchema.statics.validate = function(data) {
  const schema = {
    name: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

const Status = mongoose.model("Status", statusSchema);

module.exports.Status = Status;
