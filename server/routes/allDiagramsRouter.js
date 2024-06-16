const Router = require("express");
const router = new Router();
const allDiagramsController = require("../controllers/allDiagramsController");

router.get("/", allDiagramsController.getAll);
router.post("/", allDiagramsController.update)

module.exports = router;
