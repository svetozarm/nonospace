var express = require("express");
var proxy = require("express-http-proxy");
var path = require("path");
var logger = require("morgan");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('./dist/'));
app.use("/api/", proxy("http://localhost:3001/"));

module.exports = app;
