const { Day } = require("../../models/days");

async function getActiveDays(req, res) {
  const enteredMonth = req.params.month;
  const activeDays = await Day.find({ month: enteredMonth });
  const numberOfDays = activeDays.length;
  res.json(numberOfDays);
  console.log(numberOfDays);
}

module.exports = getActiveDays;
