const Router = require("express");
const router = new Router();
const employeesRouter = require("./employeesRouter");
const schedulePlansRouter = require("./schedulePlansRouter");
const schedulesRouter = require("./schedulesRouter");
const tasksRouter = require("./tasksRouter");
const taskLogsRouter = require("./taskLogsRouter");
const schedulePlanLogsRouter = require("./schedulePlanLogsRouter");
const allDiagramsRouter = require("./allDiagramsRouter");

router.use("/employees", employeesRouter);
router.use("/schedule_plans", schedulePlansRouter);
router.use("/schedules", schedulesRouter);
router.use("/tasks", tasksRouter);
router.use("/task_logs", taskLogsRouter);
router.use("/schedule_plan_logs", schedulePlanLogsRouter);
router.use("/allDiagrams", allDiagramsRouter);

module.exports = router;
