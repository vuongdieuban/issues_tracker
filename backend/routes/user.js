const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", UserController.getAll);
router.get("/:id", validateObjectId, UserController.getOne);

module.exports = router;
