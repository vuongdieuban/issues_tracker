const { IssueType } = require("../models/issueType");
const BaseController = require("./baseController");

class IssueTypeController extends BaseController {
  constructor(model) {
    super(model);
  }
}

module.exports = new IssueTypeController(IssueType);
