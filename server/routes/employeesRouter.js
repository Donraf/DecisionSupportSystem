const Router = require("express");
const router = new Router();
const employeesController = require("../controllers/employeesController");

router.get("/", employeesController.getAll);
router.get("/:id", employeesController.getOne);
router.get("/scheduleId/:schedule_id", employeesController.getByScheduleId);

module.exports = router;
