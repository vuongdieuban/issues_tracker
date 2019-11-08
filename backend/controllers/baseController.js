class BaseController {
  constructor(model) {
    this.model = model;
  }

  getAll = async (req, res) => {
    return res.status(200).json(await this.model.find());
  };

  post = async (req, res) => {
    const { error } = this.model.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const data = await this.model.create(req.body);
    res.status(200).json(data);
  };

  getOne = async (req, res) => {
    const data = await this.model.findOne({ _id: req.params.id });
    if (!data) return res.status(404).json("No data found with this id");
    res.status(200).json(data);
  };

  updateOne = async (req, res) => {
    const data = await this.model.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!data) return res.status(404).json("No data found with this id");
    res.status(200).json(data);
  };

  deleteOne = async (req, res) => {
    const data = await this.model.findOneAndRemove({ _id: req.params.id });
    if (!data) return res.status(404).json("No data found with this id");
    res.status(200).json(data);
  };
}

module.exports = BaseController;
