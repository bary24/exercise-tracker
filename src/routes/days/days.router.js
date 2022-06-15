const express = require("express");
const getActiveDays = require("./days.controller");
const daysRouter = express.Router();

daysRouter.get("/activedays/:month", getActiveDays);

module.exports = daysRouter;
