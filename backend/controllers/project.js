const { Project } = require("../models/project");
const { Issue } = require("../models/issue");
const BaseController = require("./baseController");

class ProjectController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Get all issues from this particular project id
  getOne = async (req, res) => {
    const data = await Issue.find({ project: req.params.id })
      .sort("data")
      .populate({ path: "project", select: "name summary languages" })
      .populate({ path: "issueType", select: "name" })
      .populate({ path: "priority", select: "name level" })
      .populate({ path: "status", select: "name" });
    res.status(200).json(data);
  };
}

module.exports = new ProjectController(Project);
