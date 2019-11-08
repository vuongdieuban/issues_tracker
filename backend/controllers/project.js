const { Project } = require("../models/project");
const BaseController = require("./baseController");

class ProjectController extends BaseController {
  constructor(model) {
    super(model);
  }
}

module.exports = new ProjectController(Project);
