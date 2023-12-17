import express from "express";
import bodyParser from "body-parser";
import { calculateBMI, BMIResult } from "./modules/bmiCalc";
import { calculateExercises, ExerciseResult, parseExercisesInput }from "./modules/exerciseCalc"

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  const heightVal = Number(height);
  const weightVal = Number(weight);

  if (isNaN(heightVal) || isNaN(weightVal)) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const result: BMIResult = calculateBMI(heightVal, weightVal);
  res.json(result);
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  try {
    const { target: validatedTarget, dailyExercises: validatedExercises } = parseExercisesInput(daily_exercises, target);
    const result: ExerciseResult = calculateExercises(validatedExercises, validatedTarget);
    res.json(result);
  } catch (error: unknown) {
    res.status(400).json({ error: (error instanceof Error) ? error.message : 'Unknown error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
