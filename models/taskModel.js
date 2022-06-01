const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Task must have name."],
  },

  shortDescription: {
    type: String,
    required: [true, "Task must have some description."],
  },

  dateAndTime: {
    type: Date,
    default: Date.now(),
  },

  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
