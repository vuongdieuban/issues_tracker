const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const UserController = require("../controllers/user");

router.get("/", UserController.getAll);
router.post("/", UserController.post); // temporary only. User create process should be done in OAuth signin
router.get("/me", validateObjectId, UserController.getOne); // get all issues related to one particular user. Should be protected by auth middleware

module.exports = router;
