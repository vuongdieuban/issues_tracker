const { Project } = require("../models/project");
const { Issue } = require("../models/issue");
const BaseController = require("./baseController");

class ProjectController extends BaseController {
  constructor(model) {
    super(model);
  }

  getOne = async (req, res) => {
    const data = await Issue.findOne({ project: req.params.id })
      .populate({ path: "project", select: "name" })
      .populate({ path: "issueType", select: "name" })
      .populate({ path: "priority", select: "name level" })
      .populate({ path: "status", select: "name" });
    if (!data) return res.status(404).json("No data found with this id");
    res.status(200).json(data);
  };
}

module.exports = new ProjectController(Project);
