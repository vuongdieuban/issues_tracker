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
      .populate({ path: "project", select: "name summary languages" })
      .populate({ path: "issueType", select: "name" })
      .populate({ path: "priority", select: "name level" })
      .populate({ path: "openBy", select: "name email isAdmin" })
      .populate({ path: "status", select: "name" });
    res.status(200).json(data);
  };

  post = async (req, res) => {
    const { error } = this.model.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      // if a field is Object Refernce Id then pre-save hook will check to ensure the Id exists before save
      // Only Issue have reference Id currently. Pre-save hook is defined in Issue model
      let data = await this.model.create(req.body);
      data = await this.model.populate(data, [
        { path: "project", select: "name summary languages" },
        { path: "issueType", select: "name" },
        { path: "priority", select: "name level" },
        { path: "openBy", select: "name email isAdmin" },
        { path: "status", select: "name" }
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  getOne = async (req, res) => {
    const data = await this.model
      .find({ _id: req.params.id })
      .sort("date")
      .populate({ path: "project", select: "name summary languages" })
      .populate({ path: "issueType", select: "name" })
      .populate({ path: "priority", select: "name level" })
      .populate({ path: "openBy", select: "name email isAdmin" })
      .populate({ path: "status", select: "name" });

    if (!data.length) return res.status(404).json("No data found with this id");
    res.status(200).json(data);
  };

  updateOne = async (req, res) => {
    const { error } = this.model.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      let data = await this.model.findOne({ _id: req.params.id });
      if (!data) return res.status(404).json("No data found with this id");
      for (let [key, val] of Object.entries(req.body)) {
        data[key] = val;
      }
      // if a field is Object Refernce Id then pre-save hook will check to ensure the Id exists before save
      // Only Issue have reference Id currently. Pre-save hook is defined in Issue model
      data = await data.save();
      data = await this.model.populate(data, [
        { path: "project", select: "name summary languages" },
        { path: "issueType", select: "name" },
        { path: "priority", select: "name level" },
        { path: "openBy", select: "name email isAdmin" },
        { path: "status", select: "name" }
      ]);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
}

module.exports = new IssueController(Issue);
