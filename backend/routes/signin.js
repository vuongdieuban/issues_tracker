const express = require("express");
const router = express.Router();
const SigninController = require("../controllers/signin");

router.post("/", SigninController.signin);
module.exports = router;
