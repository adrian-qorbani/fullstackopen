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
  if (hours.length === 0) {
    throw new Error('Please provide valid exercise hours.');
  }
  
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

const parseArguments = (args: Array<string>): { target: number, hours: Array<number> } => {
  if (args.length < 3) throw new Error('Not enough arguments.');
  
  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error('Invalid target input.');
  }
  
  const exerciseHours = args.slice(3).map(Number);
  if (exerciseHours.some(isNaN)) {
    throw new Error('Invalid exercise hours input.');
  }
  
  return {
    target,
    hours: exerciseHours,
  };
};

try {
  console.log(calculateExercises(parseArguments(process.argv).hours, parseArguments(process.argv).target));
} catch (error: unknown) {
  console.log('Something bad happened:', error instanceof Error ? error.message : 'unknown error.');
}