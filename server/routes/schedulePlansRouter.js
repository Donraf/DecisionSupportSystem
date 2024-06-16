const Router = require("express");
const router = new Router();
const schedulePlansController = require("../controllers/schedulePlansController");

router.get("/", schedulePlansController.getAll);
router.get("/:id", schedulePlansController.getOne);

module.exports = router;
