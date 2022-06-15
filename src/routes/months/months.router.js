const express = require("express");
const getHighestMonth = require("./months.controller");
const monthsRouter = express.Router();
monthsRouter.get("/highestMonth", getHighestMonth);

module.exports = monthsRouter;
