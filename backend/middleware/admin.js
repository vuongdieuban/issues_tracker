module.exports = function(req, res, next) {
  // req.user from auth middleware function, which should happens first before this admin middleware
  if (!req.user.isAdmin) return res.status(403).send("Access Denied.");
  next();
};
