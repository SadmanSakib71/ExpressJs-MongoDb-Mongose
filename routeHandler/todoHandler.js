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
router.post("/all", async (req, res) => {});

//put a todo
router.put("/:id", async (req, res) => {});

//delete the todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
