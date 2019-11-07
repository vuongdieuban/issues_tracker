require("express-async-errors");

module.exports = function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something failed on the server");
};
