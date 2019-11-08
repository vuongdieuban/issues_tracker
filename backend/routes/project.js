const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const ProjectController = require("../controllers/project");

router.get("/", ProjectController.getAll);
router.post("/", ProjectController.post);
router.get("/:id", validateObjectId, ProjectController.getOne);
router.put("/:id", validateObjectId, ProjectController.updateOne);
router.delete("/:id", validateObjectId, ProjectController.deleteOne);

module.exports = router;
