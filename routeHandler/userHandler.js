const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const userSchema = require("../schemas/userSchema");

//create mongoose model
const user = mongoose.model("user", userSchema);

//routes without id

//signUp
router.post("/", async (req, res) => {});

module.exports = router;
