const express = require("express");

//express app initialization
const app = express();
app.use(express.json());

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
