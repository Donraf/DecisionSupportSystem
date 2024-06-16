const { Schedules } = require("../models/models");

class SchedulesController {
  async getById(req, res) {
    const { id } = req.params;
    const schedule = await Schedules.findOne({
      where: {
        id: id,
      },
    });
    return res.json(schedule);
  }

  async getBySchedulePlanId(req, res) {
    const { schedule_plan_id } = req.params;
    const schedulePlan = await Schedules.findAll({
      where: {
        schedule_plan_id: schedule_plan_id,
      },
    });
    return res.json(schedulePlan);
  }
}

module.exports = new SchedulesController();
