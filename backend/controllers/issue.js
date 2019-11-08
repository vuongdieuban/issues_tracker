const { Issue } = require("../models/issue");
const BaseController = require("./baseController");

class IssueController extends BaseController {
  constructor(model) {
    super(model);
  }

  getAll = async (req, res) => {
    const data = await this.model
      .find()
      .sort("date")
      .populate({ path: "project", select: "name" })
      .populate({ path: "issueType", select: "name" })
      .populate({ path: "priority", select: "name level" })
      .populate({ path: "status", select: "name" });
    res.status(200).json(data);
  };

  getOne = async (req, res) => {
    const data = await this.model
      .find({ _id: req.params.id })
      .sort("date")
      .populate({ path: "project", select: "name" })
      .populate({ path: "issueType", select: "name" })
      .populate({ path: "priority", select: "name level" })
      .populate({ path: "status", select: "name" });

    if (!data.length) return res.status(404).json("No data found with this id");
    res.status(200).json(data);
  };
}

module.exports = new IssueController(Issue);
