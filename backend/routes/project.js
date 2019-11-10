const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const ProjectController = require("../controllers/project");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", ProjectController.getAll);
router.post("/", auth, ProjectController.post);
router.get("/:id", validateObjectId, ProjectController.getOne);
router.put("/:id", validateObjectId, auth, ProjectController.updateOne);
router.delete(
  "/:id",
  validateObjectId,
  [auth, admin],
  ProjectController.deleteOne
);

module.exports = router;
