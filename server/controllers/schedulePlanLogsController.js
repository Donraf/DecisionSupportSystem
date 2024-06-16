const { SchedulePlanLogs } = require("../models/models");
class SchedulePlanLogsController {
  async getAll(req, res) {}

  async getOne(req, res) {
    const { id } = req.params;
    let chart;
    if (!id) {
      return;
    }
    chart = await SchedulePlanLogs.findAll({ where: { schedule_plan_id: id } });
    var readyChart = [];
    var isFirstForecast = true;
    var prevDataPiece = {};
    for (var i in chart) {
      var dataPiece = {
        log_date: chart[i].dataValues.log_date,
        planned_work: chart[i].dataValues.planned_work,
        necessary_work: chart[i].dataValues.necessary_work,
      };
      if (chart[i].dataValues.intel_forecast) {
        if (isFirstForecast) {
          isFirstForecast = false;
          prevDataPiece.forecast_work = prevDataPiece.actual_work;
          readyChart.pop();
          readyChart.push(prevDataPiece);
        }
        dataPiece["forecast_work"] = chart[i].dataValues.actual_work;
      } else {
        dataPiece["actual_work"] = chart[i].dataValues.actual_work;
      }
      prevDataPiece = dataPiece;
      readyChart.push(dataPiece);

      // console.log(readyChart);
    }
    return res.json(readyChart);
  }
}

module.exports = new SchedulePlanLogsController();
