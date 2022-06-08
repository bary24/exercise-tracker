const mongoose = require("mongoose");
const daySchema = mongoose.Schema({
  number: {
    type: Number,
    //add unique later
  },
  month: Number,
});

const Day = mongoose.model("Day", daySchema);

module.exports = { Day, daySchema };
