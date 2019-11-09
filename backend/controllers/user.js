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
    // req.user is added in by auth middleware
    const data = await Issue.find({ openBy: { _id: req.user._id } })
      .populate({ path: "project", select: "name" })
      .populate({ path: "issueType", select: "name" })
      .populate({ path: "priority", select: "name level" })
      .populate({ path: "openBy", select: "name email" })
      .populate({ path: "status", select: "name" });
    res.status(200).json(data);
  };
}

module.exports = new UserController(User);
