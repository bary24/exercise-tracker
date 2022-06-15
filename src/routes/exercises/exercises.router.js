const express = require("express");
const { validateExercise } = require("../../models/exercises");
const { submitExercise } = require("./exercises.controller");
const validateMiddleWare = require("../../middleware/validate");
const exercisesRouter = express.Router();
exercisesRouter.post(
  "/exercises",
  [validateMiddleWare(validateExercise)],
  submitExercise
);

module.exports = exercisesRouter;
