const express = require("express");
const morgan = require("morgan");
const exerciseRouter = require("./routes/exercises/exercises.router");
const daysRouter = require("./routes/days/days.router");
const monthsRouter = require("./routes/months/months.router");
const usersRouter = require("./routes/users/users.router");
const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.use("/", exerciseRouter);
app.use("/", daysRouter);
app.use("/", monthsRouter);
app.use("/", usersRouter);

module.exports = app;
