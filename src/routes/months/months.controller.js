const Month = require("../../models/months");

async function getHighestMonth(req, res) {
  const highestMonth = await Month.find({})
    .sort({ numberOfLoggedDays: -1 })
    .limit(1);
  res.json(highestMonth[0].monthNumber);
}

module.exports = getHighestMonth;
