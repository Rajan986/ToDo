const express = require("express");
const taskController = require("../controller/taskController");

const router = express.Router();

router.route("/").get(taskController.getAllTasks);
router.route("/").post(taskController.createTask);
router.route("/").delete(taskController.deleteAllTask);
router.route("/:id").get(taskController.getATask);
router.route("/:id").patch(taskController.updateTask);
router.route("/:id").delete(taskController.deleteTask);
router.route("/completed/:YesNo").get(taskController.completeAndPendingTask);

module.exports = router;
