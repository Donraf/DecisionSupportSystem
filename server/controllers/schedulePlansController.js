const { SchedulePlans } = require("../models/models");

class SchedulePlansController {
  async getAll(req, res) {
    const schedulePlans = await SchedulePlans.findAll();
    return res.json(schedulePlans);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const schedulePlan = await SchedulePlans.findOne({
      where: {
        id: id,
      },
    });
    return res.json(schedulePlan);
  }
}

module.exports = new SchedulePlansController();
