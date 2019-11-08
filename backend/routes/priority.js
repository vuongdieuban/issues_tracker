const express = require("express");
const router = express.Router();
const PriorityController = require("../controllers/priority");

router.get("/", PriorityController.getAll);
router.post("/", PriorityController.post);

module.exports = router;
