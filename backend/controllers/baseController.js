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

    try {
      // if a field is Object Refernce Id then pre-save hook will check to ensure the Id exists before save
      // Only Issue have reference Id currently. Pre-save hook is defined in Issue model
      const data = await this.model.create(req.body);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  getOne = async (req, res) => {
    const data = await this.model.findOne({ _id: req.params.id });
    if (!data) return res.status(404).json("No data found with this id");
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
      await data.save();
      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  deleteOne = async (req, res) => {
    const data = await this.model.findOneAndRemove({ _id: req.params.id });
    if (!data) return res.status(404).json("No data found with this id");
    res.status(200).json(data);
  };
}

module.exports = BaseController;
