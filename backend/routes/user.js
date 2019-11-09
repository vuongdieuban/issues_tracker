const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const UserController = require("../controllers/user");

router.get("/", UserController.getAll);
router.get("/:id", UserController.getOne); // temp only
// router.get("/me", UserController.getOne); // get all issues related to one particular user. Should be protected by auth middleware

module.exports = router;
