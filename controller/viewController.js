const Task = require("../models/taskModel");

exports.getHomePage = async (req, res) => {
  const tasks = await Task.find();
  res.render("todo", { tasks });
};

exports.editTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  // console.log(task);
  res.render("edit", { task });
};

// exports.getPendingTasks = async (req, res) => {
//   const tasks = await Task.find({ completed: false });

//   res.render("todo", { tasks });
// };
