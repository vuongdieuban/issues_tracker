const { User } = require("../models/user");
const { Issue } = require("../models/issue");
const BaseController = require("./baseController");

// User profile should be created during OAuth sign-in process
class UserController extends BaseController {
  constructor(model) {
    super(model);
  }

  // get all issues related to this user
  getOne = async (req, res) => {
    const data = await Issue.find({ user: { googleId: req.body.googleId } })
      .populate({ path: "project", select: "name" })
      .populate({ path: "issueType", select: "name" })
      .populate({ path: "priority", select: "name level" })
      .populate({ path: "status", select: "name" });
    res.status(200).json(data);
  };
}

module.exports = new UserController(User);
