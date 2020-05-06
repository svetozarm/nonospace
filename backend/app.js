var express = require("express");
var proxy = require("express-http-proxy");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var nonogramRouter = require("./routes/nonogram");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/nonogram", nonogramRouter);
app.use("/test", (req, res) => {
  res.send({
    users: "zonk",
  });
});

module.exports = app;
