const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const IssueController = require("../controllers/issue");
const auth = require("../middleware/auth");
const issueWiteAccess = require("../middleware/issueWiteAccess");

router.get("/", IssueController.getAll);
router.post("/", auth, IssueController.post);
router.get("/:id", validateObjectId, IssueController.getOne);
router.put(
  "/:id",
  validateObjectId,
  [auth, issueWiteAccess],
  IssueController.updateOne
);
router.delete(
  "/:id",
  validateObjectId,
  [auth, issueWiteAccess],
  IssueController.deleteOne
);

module.exports = router;
