const Router = require('express')
const router = new Router()
const schedulePlanLogsController = require('../controllers/schedulePlanLogsController')

router.get('/', schedulePlanLogsController.getAll)
router.get('/:id', schedulePlanLogsController.getOne)

module.exports = router
