// const mongoose = require("mongoose");
const app = require("./app");
const connectMongo = require("./services/mongo");
const Exercise = require("./models/exercises");
const http = require("http");
const { Day } = require("./models/days");
const Month = require("./models/months");
const port = process.env.port || 8000;

const server = http.createServer(app);

async function startServer() {
  await connectMongo();
  server.listen(port, function () {
    console.log(`working on ${port}`);
  });
}

startServer();

app.post("/exercises", async (req, res) => {
  try {
    const exerciseData = req.body;
    const exercise = await Exercise.create(exerciseData); //creating the exercise
    await Exercise.updateOne(
      { _id: exercise._id },
      {
        day: exercise.created_at.getDate(), //Adding the month and date in which the exercise was submitted
        month: exercise.created_at.getMonth() + 1,
      }
    );
    let updatedExercise = await Exercise.findOne({ _id: exercise._id });
    let day = await Day.create({
      number: updatedExercise.day, // number refers to the number of the day in the month
      month: updatedExercise.month, // month refers to the number of the month in a year
    });
    let monthExists = Boolean(Month.findOne({ monthNumber: day.month }));
    console.log(monthExists);
    if (monthExists) {
      console.log("Month Exists");
      let existingMonth = await Month.findOne({ monthNumber: day.month });
      let loggedDays = existingMonth.loggedDays;
      console.log(loggedDays);
      await loggedDays.push(day);

      let newMonth = await Month.findByIdAndUpdate(existingMonth._id, {
        loggedDays: loggedDays,
        numberOfLoggedDays: loggedDays.length,
      });
      console.log(newMonth);
    } else {
      let month = await Month.create({
        monthNumber: updatedExercise.month,
      });
      let monthArr = month.loggedDays;
      await monthArr.push(day);
      let newMonthArray = monthArr;

      let updateRes = await Month.findByIdAndUpdate(month._id, {
        loggedDays: newMonthArray,
        numberOfLoggedDays: newMonthArray.length,
      });
      console.log(updateRes);

      res.json("Okay");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/activedays/:month", async (req, res) => {
  const enteredMonth = req.params.month;
  const activeDays = await Day.find({ month: enteredMonth });
  const numberOfDays = activeDays.length;
  res.json(numberOfDays);
});

app.get("/highestMonth", async (req, res) => {
  const highestMonth = await Month.find({})
    .sort({ numberOfLoggedDays: -1 })
    .limit(1);
  res.json(highestMonth);
});
