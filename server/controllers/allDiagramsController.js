const { Diagrams } = require("../models/models");

class AllDiagramsController {
  async getAll(req, res) {
    const diagrams = await Diagrams.findOne({attributes: ['diagrams'],});
    return res.json(diagrams);
  }
  async update(req, res) {
    console.log(req.body);
    await Diagrams.destroy({
      truncate: true,
    });
    await Diagrams.create({diagrams: JSON.stringify(req.body)})
    return res.json("Request Handled")
  }
}

module.exports = new AllDiagramsController();
