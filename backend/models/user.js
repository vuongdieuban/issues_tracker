const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  isAdmin: Boolean
});

// Add method to userSchema (user object) to create token, 'this' refer to specific user object
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      googleId: this.googleId,
      name: this.name,
      email: this.email,
      iat: new Date().getTime(), //current time (issue at)
      exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead (expire date)
    },
    config.get("JwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
