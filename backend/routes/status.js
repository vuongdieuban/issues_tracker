const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const StatusController = require("../controllers/status");

router.get("/", StatusController.getAll);
router.post("/", StatusController.post);
router.get("/:id", validateObjectId, StatusController.getOne);
router.put("/:id", validateObjectId, StatusController.updateOne);
router.delete("/:id", validateObjectId, StatusController.deleteOne);

module.exports = router;
