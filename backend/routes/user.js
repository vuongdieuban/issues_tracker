const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const UserController = require("../controllers/user");

router.get("/", UserController.getAll);
router.get("/me", auth, UserController.getOne); // get all issues related to one particular user.

module.exports = router;
