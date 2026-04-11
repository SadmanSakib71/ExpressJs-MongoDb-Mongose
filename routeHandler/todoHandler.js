const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");

//create mongoose model
const toDo = mongoose.model("toDo", todoSchema);

//get all the todo
router.get("/", async (req, res) => {});

//get a todo by id
router.get("/:id", async (req, res) => {});

//post a todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new toDo(req.body);
    await newTodo.save();
    res.status(200).json({ message: "Todo inserted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//post all the todo
router.post("/all", async (req, res) => {
  try {
    await toDo.insertMany(req.body);
    res.status(200).json({ message: "Todos were inserted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//put a todo
router.put("/:id", async (req, res) => {
  try {
    await toDo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      },
    );
    res.status(200).json({ message: "Todos was updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete the todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
