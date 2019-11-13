const { Issue } = require("../models/issue");
// IssueWiteAccess Middleware.
// Check if user is the author of the issue (openBy) or user isAdmin
module.exports = async function(req, res, next) {
  const issue = await Issue.findOne({ _id: req.params.id });

  // req.user from auth middleware function, which should happens first before this middleware
  if (req.user._id === issue.openBy.toString() || req.user.isAdmin === true) {
    next();
  } else {
    return res.status(403).send("Access Denied.");
  }
};
