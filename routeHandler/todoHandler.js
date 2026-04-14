const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const checkLogin = require("../middleWare/checkLogin");

//create mongoose model
const toDo = mongoose.model("toDo", todoSchema);

//routes without id

//get all the todo
router.get("/", checkLogin, async (req, res) => {
  try {
    //populate with user...
    const result = await toDo
      .find({}, { _id: 0 })
      .populate("user", "name userName -_id");

    res.status(200).json({ result: result, message: "Todos get successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get all the active todo by instance method
router.get("/active", async (req, res) => {
  try {
    const todo = new toDo();
    const result = await todo.findActive();
    res
      .status(200)
      .json({ result: result, message: "active Todos get successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get all the todo by word match-static method
router.get("/word/:word", async (req, res) => {
  try {
    const result = await toDo.findByWord(req.params.word);
    res
      .status(200)
      .json({ result: result, message: "active Todos get successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get all the todo by word match-query method
router.get("/word", async (req, res) => {
  try {
    const result = await toDo.find().byLanguage("joy");
    res
      .status(200)
      .json({ result: result, message: "active Todos get successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//post a todo
router.post("/", checkLogin, async (req, res) => {
  try {
    //got the userId from middle ware,and connect user with todo
    const newTodo = new toDo({ ...req.body, user: req.userId });
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

//put all the todo at a time ,a specific field

router.put("/bulk", async (req, res) => {
  try {
    await toDo.updateMany(
      {},
      {
        $set: {
          status: req.body.status,
        },
      },
      { runValidators: true },
    );
    res.status(200).json({ message: "Todos was updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//put all the todo but not a specific field
router.put("/bulk-update", async (req, res) => {
  try {
    const operations = req.body.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: {
          $set: {
            title: item.title,
          },
        },
        runValidators: true,
      },
    }));

    const result = await toDo.bulkWrite(operations, {
      ordered: true,
    });

    res
      .status(200)
      .json({ result: result, message: "Todos was updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete the todos
router.delete("/delete-all", async (req, res) => {
  try {
    const result = await toDo.deleteMany({ status: "active" });

    res
      .status(200)
      .json({ result: result, message: "Todos was successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//routes with id

//get a todo by id
router.get("/:id", async (req, res) => {
  try {
    const result = await toDo.findOne({ _id: req.params.id }, { _id: 0 });

    res.status(200).json({ result: result, message: "successfully get" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//put a todo by
router.put("/:id", async (req, res) => {
  try {
    await toDo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
        },
      },
      { runValidators: true },
    );
    res.status(200).json({ message: "Todos was updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  //   try {
  //   const updater = await toDo.findByIdAndUpdate(
  //     { _id: req.params.id },
  //     {
  //       $set: {
  //         status: req.body.status,
  //       },
  //     },
  //     { new: true, runValidators: true },
  //   );
  //   res
  //     .status(200)
  //     .json({ result: updater, message: "Todos was updated successfully" });
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
});

//delete the single todo
router.delete("/:id", async (req, res) => {
  try {
    await toDo.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Todo was successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
