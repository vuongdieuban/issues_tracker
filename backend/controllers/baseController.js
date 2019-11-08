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
}

module.exports = BaseController;
