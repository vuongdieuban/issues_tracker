const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const PriorityController = require("../controllers/priority");

router.get("/", PriorityController.getAll);
router.post("/", PriorityController.post);
router.get("/:id", validateObjectId, PriorityController.getOne);
router.put("/:id", validateObjectId, PriorityController.updateOne);
router.delete("/:id", validateObjectId, PriorityController.deleteOne);

module.exports = router;
