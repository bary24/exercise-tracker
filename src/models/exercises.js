const mongoose = require("mongoose");
const Joi = require("joi");
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
const schema = Joi.object({
  exerciseName: Joi.string().min(3).required(),
  hours: Joi.number().integer().max(4).required(),
  minutes: Joi.number().integer().max(59),
});
const validateExercise = (exercise) => {
  return schema.validate(exercise);
};
module.exports = { Exercise, validateExercise };
