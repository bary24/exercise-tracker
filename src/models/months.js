const mongoose = require("mongoose");
const { daySchema } = require("./days");
const monthSchema = mongoose.Schema({
  loggedDays: [daySchema],
  monthNumber: {
    type: Number,
    //add unique later
  },
  numberOfLoggedDays: Number,
});

const Month = mongoose.model("Month", monthSchema);

module.exports = Month;
