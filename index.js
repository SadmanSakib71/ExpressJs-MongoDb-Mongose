const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");
require("dotenv").config();

//express app initialization
const app = express();
app.use(express.json());

//connect mongoose with database
mongoose
  .connect("mongodb://localhost/toDos")
  .then(() => console.log("connection sucessfull"))
  .catch((err) => console.log(err));

//app routes
app.use("/todo", todoHandler);
app.use("/user", userHandler);

//default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headerssent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

app.listen(3000, () => {
  console.log("listening on the server port 3000");
});
