const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inActive"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

todoSchema.method = {
  findActive: () => {
    return mongoose.model("toDo").find({ status: "active" });
  },
};

module.exports = todoSchema;
