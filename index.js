const express = require("express");
const mongoose = require("mongoose");

//express app initialization
const app = express();
app.use(express.json());

//connect mongoose with database
mongoose
  .connect("mongodb://localhost/toDos")
  .then(() => console.log("connection sucessfull"))
  .catch((err) => console.log(err));

//app routes

//default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headerssent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.listen(3000, () => {
  console.log("listening on the server port 3000");
});
