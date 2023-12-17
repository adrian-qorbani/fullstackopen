import express from 'express';
import bodyParser from 'body-parser';
import { calculateBMI, BMIResult } from './modules/bmiCalc';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  const heightVal = Number(height);
  const weightVal = Number(weight);

  if (isNaN(heightVal) || isNaN(weightVal)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  const result: BMIResult = calculateBMI(heightVal, weightVal);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});