const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const IssueTypeController = require("../controllers/issueType");

router.get("/", IssueTypeController.getAll);
router.post("/", IssueTypeController.post);
router.get("/:id", validateObjectId, IssueTypeController.getOne);
router.put("/:id", validateObjectId, IssueTypeController.updateOne);
router.delete("/:id", validateObjectId, IssueTypeController.deleteOne);

module.exports = router;
