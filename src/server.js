// const mongoose = require("mongoose");
const app = require("./app");
const connectMongo = require("./services/mongo");
const { submitExercise } = require("./routes/exercises/exercises.controller");
const http = require("http");
const { Day } = require("./models/days");
const Month = require("./models/months");
const port = process.env.port || 8000;

const server = http.createServer(app);

const startingServerPromise = startServer();
async function startServer() {
  await connectMongo();
  server.listen(port, function () {
    console.log(`working on ${port}`);
  });
}

app.post("/exercises", submitExercise);

app.get("/activedays/:month", async (req, res) => {
  const enteredMonth = req.params.month;
  const activeDays = await Day.find({ month: enteredMonth });
  const numberOfDays = activeDays.length;
  res.json(numberOfDays);
  console.log(numberOfDays);
});

app.get("/highestMonth", async (req, res) => {
  const highestMonth = await Month.find({})
    .sort({ numberOfLoggedDays: -1 })
    .limit(1);
  res.json(highestMonth[0].monthNumber);
});

module.exports = startingServerPromise;
