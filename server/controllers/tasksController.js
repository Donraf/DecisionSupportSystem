const { Schedules, Tasks, Employees } = require("../models/models");

class TasksController {
  async getAll(req, res) {
    const tasks = await Tasks.findAll();
    return res.json(tasks);
  }

  async getOne(req, res) {}

  async getByScheduleIdEmployeeId(req, res) {
    const { schedule_id, employee_id } = req.params;
    const task = await Tasks.findAll({
      where: {
        schedule_id: schedule_id,
        employee_id: employee_id,
      },
    });
    return res.json(task);
  }

  async getBySchedulePlanId(req, res) {
    const { schedule_plan_id } = req.params;
    const schedules = await Schedules.findAll({
      where: {
        schedule_plan_id: schedule_plan_id,
      },
    });
    var schedulesIds = schedules.map((schedule) => schedule.id);
    const tasks = await Tasks.findAll({
      where: { schedule_id: schedulesIds },
    });


    var resultTasks = [];
    for (var task of tasks) {
      var employee = await Employees.findByPk(task.employee_id);
      resultTasks.push({
        employee_name: employee.name,
        schedule_id: task.schedule_id,
        task_id: task.id,
        start_date: task.start_date,
        end_date: task.end_date,
      });
    }
    return res.json(resultTasks);
  }
}

module.exports = new TasksController();
