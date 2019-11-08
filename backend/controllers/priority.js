const { Priority } = require("../models/priority");

class PriorityController {
  getAll = async (req, res) => {
    return res.status(200).json(await Priority.find());
  };

  post = async (req, res) => {
    const priority = new Priority({
      name: req.body.name,
      level: req.body.level
    });
    await priority.save();
    res.status(200).json(priority);
  };
}

module.exports = new PriorityController();
