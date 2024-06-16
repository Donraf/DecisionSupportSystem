const { Tasks, Employees } = require("../models/models");
const { Op } = require("sequelize");

class EmployeesController {
  async getAll(req, res) {
    const query = req.query;
    res.json(query);
  }

  async getOne(req, res) {
    const query = req.query;
    res.json(query);
  }

  async getByScheduleId(req, res) {
    const { schedule_id } = req.params;
    const tasks = await Tasks.findAll({
      where: {
        schedule_id: schedule_id,
      },
    });
    var employee_ids_set = new Set();
    for (var i in tasks) {
      employee_ids_set.add(tasks[i].employee_id);
    }
    const employees = await Employees.findAll({
      where: {
        [Op.or]: Array.from(employee_ids_set).map((val) => {
          return { id: val };
        }),
      },
    });
    return res.json(employees);
  }
}

module.exports = new EmployeesController();
