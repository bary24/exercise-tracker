const mongoose = require("mongoose");
const exerciseSchema = mongoose.Schema(
  {
    exerciseName: String,
    hours: Number,
    minutes: Number,
    day: Number,
    month: Number,
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
