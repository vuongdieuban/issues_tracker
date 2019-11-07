const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: "Issue" }],
  isAdmin: Boolean
});

const User = mongoose.model("User", userSchema);

module.exports.User = User;
