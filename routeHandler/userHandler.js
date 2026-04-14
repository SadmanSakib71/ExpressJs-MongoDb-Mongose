const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

//logIn
router.post("/login", async (req, res) => {
  try {
    const checkUser = await user.findOne({ userName: req.body.userName });
    if (checkUser) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        checkUser.password,
      );
      if (isValidPassword) {
        const token = jwt.sign(
          {
            userName: checkUser.userName,
            userId: checkUser._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1hr" },
        );

        res
          .status(201)
          .json({ accessToken: token, message: "Logged in successfully" });
      } else {
        res
          .status(401)
          .json({ error: "Authentication failed, password doesn't match" });
      }
    } else {
      res.status(401).json({ error: "Authentication failed,user not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

//get all users
router.get("/all", async (req, res) => {
  try {
    const users = await user.find({}).populate("todos");
    res
      .status(200)
      .json({ result: users, message: "Todos get successfully in user" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
