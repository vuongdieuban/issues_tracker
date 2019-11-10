const jwt = require("jsonwebtoken");
const config = require("config");

//General Authorization (permission). Check if user is signed in
// As long as user sign in, they can access the routes protect by this middleware
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(403).send("Access Denied. No token provided");

  // jwt.verify if successfully decode token, return a valid payload
  try {
    const decoded = jwt.verify(token, config.get("JwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send("Invalid Token");
  }
}

module.exports = auth;
