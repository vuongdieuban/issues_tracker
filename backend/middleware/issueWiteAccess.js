// IssueWiteAccess Middleware.
// Check if user is the author of the issue (openBy) or user isAdmin
module.exports = function(req, res, next) {
  // req.user from auth middleware function, which should happens first before this middleware
  if (req.user._id === req.body.openBy || req.user.isAdmin === true) {
    next();
  } else {
    return res.status(403).send("Access Denied.");
  }
};
