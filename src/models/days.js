const mongoose = require("mongoose");
const daySchema = mongoose.Schema({
  number: {
    type: Number,
  },
  month: Number,
  userId: Number,
});
daySchema.index({ number: 1, userId: 1 }, { unique: true });
const Day = mongoose.model("Day", daySchema);

module.exports = { Day, daySchema };
