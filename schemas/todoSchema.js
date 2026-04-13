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

todoSchema.methods = {
  findActive: function () {
    return mongoose.model("toDo").find({ status: "active" });
  },
};

todoSchema.statics = {
  findSakib: function () {
    return this.find({ title: /sakib/i });
  },
};

module.exports = todoSchema;
