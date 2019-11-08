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
      .populate("issueType")
      .populate("priority")
      .populate("status");
    res.status(200).json(data);
  };
}

module.exports = new IssueController(Issue);
