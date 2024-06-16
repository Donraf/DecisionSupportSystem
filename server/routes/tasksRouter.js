const Router = require('express')
const router = new Router()
const tasksController = require('../controllers/tasksController')

router.get('/', tasksController.getAll)
router.get('/:id', tasksController.getOne)
router.get('/scheduleIdEmployeeId/:schedule_id-:employee_id', tasksController.getByScheduleIdEmployeeId)
router.get('/schedulePlanId/:schedule_plan_id', tasksController.getBySchedulePlanId)

module.exports = router
