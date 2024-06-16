const Router = require('express')
const router = new Router()
const taskLogsController = require('../controllers/taskLogsController')

router.get('/', taskLogsController.getAll)
router.get('/:id', taskLogsController.getOne)

module.exports = router
