const { User } = require("../models/user");
const BaseController = require("./baseController");

// User profile should be created during OAuth sign-in process
class UserController extends BaseController {
  constructor(model) {
    super(model);
  }
}

module.exports = new UserController(User);
