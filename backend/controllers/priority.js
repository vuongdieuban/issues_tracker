const { Priority } = require("../models/priority");
const BaseController = require("./baseController");

class PriorityController extends BaseController {
  constructor(model) {
    super(model);
  }
}

module.exports = new PriorityController(Priority);
