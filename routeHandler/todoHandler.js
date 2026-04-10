const express = require("express");
const router = express.Router();

//get all the todo
router.get("/", async (req, res) => {});

//get a todo by id
router.get("/:id", async (req, res) => {});

//post a todo
router.post("/", async (req, res) => {});

//post all the todo
router.post("/all", async (req, res) => {});

//put a todo
router.put("/:id", async (req, res) => {});

//delete the todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
