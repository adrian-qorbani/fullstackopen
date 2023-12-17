interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): ExerciseResult => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  let rating = 1;
  let ratingDescription = 'You can do better!';

  if (success) {
    rating = 3;
    ratingDescription = 'Well done! You reached your target.';
  } else if (average < target && average >= target - 1) {
    rating = 2;
    ratingDescription = 'Not bad, but could be better.';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const args = process.argv.slice(2).map(Number);

const targetValue = args[0];
const exerciseHours = args.slice(1);

console.log(calculateExercises(exerciseHours, targetValue));