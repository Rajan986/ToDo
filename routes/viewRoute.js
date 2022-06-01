const express = require("express");
const viewController = require("../controller/viewController");

const router = express.Router();

router.route("/").get(viewController.getHomePage);
// router.route("/pending-task").get(viewController.getPendingTasks);

router.route("/edit-task/:id").get(viewController.editTask);
module.exports = router;

// /edit-task/${task._id}
