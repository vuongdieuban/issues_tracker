const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const IssueController = require("../controllers/issue");

router.get("/", IssueController.getAll);
router.post("/", IssueController.post);
router.get("/:id", validateObjectId, IssueController.getOne);
router.put("/:id", validateObjectId, IssueController.updateOne);
router.delete("/:id", validateObjectId, IssueController.deleteOne);

module.exports = router;
