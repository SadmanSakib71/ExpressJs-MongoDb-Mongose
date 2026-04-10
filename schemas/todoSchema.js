const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: string,
    required: true,
  },
  description: string,
  status: {
    type: string,
    enum: ["active", "inActive"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = todoSchema;
