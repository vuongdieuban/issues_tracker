const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  isAdmin: Boolean
});

// temp only. Validation is done with Google. GOogle return user profile. We don't create user profile manually
userSchema.statics.validate = function(data) {
  const schema = {
    googleId: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required()
  };
  return Joi.validate(data, schema);
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
