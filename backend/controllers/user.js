const { User } = require("../models/user");
const { Issue } = require("../models/issue");

// User profile should be created during OAuth sign-in process
class UserController {
  // get all the user with their name and email
  getAll = async (req, res) => {
    return res.status(200).json(await User.find());
  };

  // get all issues related to this user
  getOne = async (req, res) => {
    // id should be from req.user that got added in by auth middleware
    // req.params.id is just temp
    const data = await Issue.find({ openBy: { _id: req.params.id } })
      .populate({ path: "project", select: "name" })
      .populate({ path: "issueType", select: "name" })
      .populate({ path: "priority", select: "name level" })
      .populate({ path: "openBy", select: "name email" })
      .populate({ path: "status", select: "name" });
    res.status(200).json(data);
  };
}

module.exports = new UserController(User);
