const Task = require("../models/taskModel");

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    NumOfTask: tasks.length,
    data: tasks,
  });
};

exports.getATask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.status(200).json({
    data: task,
  });
};

exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    data: task,
    message: "Task created",
  });
};
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    data: task,
    message: "Task updated",
  });
};
exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).json({
    data: null,
    message: "Task deleted",
  });
};

exports.deleteAllTask = async (req, res) => {
  await Task.deleteMany();
  res.status(204).json({
    data: null,
    message: "All tasks deleted",
  });
};

exports.completeAndPendingTask = async (req, res) => {
  const { YesNo } = req.params;

  const task = await Task.find({ completed: YesNo });

  res.status(200).json({
    NumOfTask: task.length,
    data: task,
  });
};
