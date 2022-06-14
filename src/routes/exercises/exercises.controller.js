const Exercise = require("../../models/exercises");
const { Day } = require("../../models/days");
const Month = require("../../models/months");
async function submitExercise(req, res) {
  try {
    const exerciseData = req.body;
    const exercise = await Exercise.create(exerciseData); //creating the exercise
    let updatedExercise = await Exercise.findOneAndUpdate(
      { _id: exercise._id },
      {
        day: exercise.created_at.getDate(), //Adding the month and date in which the exercise was submitted
        month: exercise.created_at.getMonth() + 1,
      },
      { new: true }
    );

    let day = await Day.create({
      number: updatedExercise.day, // number refers to the number of the day in the month
      month: updatedExercise.month, // month refers to the number of the month in a year
    });

    const foundMonth = await Month.findOneAndUpdate(
      { monthNumber: day.month },
      { monthNumber: day.month, $addToSet: { loggedDays: day } }, //adds the loggedday in the loggedDays array
      { upsert: true, new: true }
    );
    console.log(foundMonth);
    console.log(day);
    await Month.updateOne(
      { monthNumber: day.month }
      //adds the numberofLoggedDays property
    );
    res.status(201).json("done");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { submitExercise };
