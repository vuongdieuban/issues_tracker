const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  isAdmin: Boolean
});

const User = mongoose.model("User", userSchema);

module.exports.User = User;
