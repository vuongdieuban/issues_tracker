const Joi = require("joi");
const mongoose = require("mongoose");

const prioritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true }
});

prioritySchema.statics.validate = function(data) {
  const schema = {
    name: Joi.string().required(),
    level: Joi.number().required()
  };
  return Joi.validate(data, schema);
};

const Priority = mongoose.model("Priority", prioritySchema);

module.exports.Priority = Priority;
