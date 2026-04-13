const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../schemas/userSchema");

//create mongoose model
const user = mongoose.model("user", userSchema);

//routes without id

//signUp
router.post("/signUp", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new user({
      name: req.body.name,
      userName: req.body.userName,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
