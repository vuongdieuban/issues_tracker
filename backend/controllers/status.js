const { Status } = require("../models/status");
const BaseController = require("./baseController");

class StatusController extends BaseController {
  constructor(model) {
    super(model);
  }
}

module.exports = new StatusController(Status);
