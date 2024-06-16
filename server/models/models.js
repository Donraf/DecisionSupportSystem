const sequelize = require("../db.js");
const { DataTypes } = require("sequelize");

const Employees = sequelize.define(
  "employees",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
  }
);

const SchedulePlans = sequelize.define(
  "schedule_plans",
  {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
  },
  {
    timestamps: false,
  }
);

const Schedules = sequelize.define(
  "schedules",
  {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
  },
  {
    timestamps: false,
  }
);

const Tasks = sequelize.define(
  "tasks",
  {
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    start_date: { type: DataTypes.TIME, allowNull: false },
    end_date: { type: DataTypes.TIME, allowNull: false },
  },
  {
    timestamps: false,
  }
);

const SchedulePlanLogs = sequelize.define(
  "schedule_plan_logs",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    log_date: { type: DataTypes.DATE, allowNull: false },
    planned_work: { type: DataTypes.FLOAT },
    actual_work: { type: DataTypes.FLOAT },
    necessary_work: { type: DataTypes.FLOAT },
    intel_forecast: { type: DataTypes.FLOAT },
  },
  {
    timestamps: false,
  }
);

const TaskLogs = sequelize.define(
  "task_logs",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    log_date: { type: DataTypes.DATE, allowNull: false },
    planned_work: { type: DataTypes.FLOAT },
    actual_work: { type: DataTypes.FLOAT },
    necessary_work: { type: DataTypes.FLOAT },
    intel_forecast: { type: DataTypes.FLOAT },
  },
  {
    timestamps: false,
  }
);

Employees.hasMany(SchedulePlans, { foreignKey: "owner_id" });
SchedulePlans.belongsTo(Employees, { foreignKey: "owner_id" });

SchedulePlans.hasMany(SchedulePlanLogs, { foreignKey: "schedule_plan_id" });
SchedulePlanLogs.belongsTo(SchedulePlans, { foreignKey: "schedule_plan_id" });

SchedulePlans.hasMany(Schedules, { foreignKey: "schedule_plan_id" });
Schedules.belongsTo(SchedulePlans, { foreignKey: "schedule_plan_id" });

Schedules.hasMany(Tasks, { foreignKey: "schedule_id" });
Tasks.belongsTo(Schedules, { foreignKey: "schedule_id" });

Employees.hasMany(Tasks, { foreignKey: "employee_id" });
Tasks.belongsTo(Employees, { foreignKey: "employee_id" });

Tasks.hasMany(TaskLogs, { foreignKey: "task_id" });
TaskLogs.belongsTo(Tasks, { foreignKey: "task_id" });

const Diagrams = sequelize.define(
  "diagrams",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    diagrams: { type: DataTypes.JSON },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  Employees,
  SchedulePlans,
  Schedules,
  Tasks,
  SchedulePlanLogs,
  TaskLogs,
  Diagrams,
};
