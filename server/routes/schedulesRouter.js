const Router = require('express')
const router = new Router()
const schedulesController = require('../controllers/schedulesController')

router.get('/schedulePlanId/:schedule_plan_id', schedulesController.getBySchedulePlanId)
router.get('/:id', schedulesController.getById)

module.exports = router
