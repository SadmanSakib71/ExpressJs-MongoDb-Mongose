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
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

//instance methods
todoSchema.methods = {
  findActive: function () {
    return mongoose.model("toDo").find({ status: "active" });
  },
};

//statics methods
todoSchema.statics = {
  findByWord: function (word) {
    return this.find({ title: new RegExp(word, "i") });
  },
};

//query methods
todoSchema.query = {
  byLanguage: function (language) {
    return this.find({ title: new RegExp(language, "i") });
  },
};

module.exports = todoSchema;
