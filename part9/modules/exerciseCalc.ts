export interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface inputExerciseInterface {
  target: number;
  dailyExercises: Array<number>;
}

export const parseExercisesInput = (
  dailyExercises: Array<number>,
  target: number
): inputExerciseInterface => {
  if (
    !Array.isArray(dailyExercises) ||
    dailyExercises.length === 0 ||
    target === undefined
  ) {
    throw new Error("parameters missing");
  }

  if (
    !dailyExercises.every((hour) => typeof hour === "number") ||
    typeof target !== "number"
  ) {
    throw new Error("malformatted parameters");
  }

  return {
    target,
    dailyExercises,
  };
};

export const calculateExercises = (
  dailyExercises: Array<number>,
  target: number
): ExerciseResult => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((hour) => hour > 0).length;
  const sum = dailyExercises.reduce((a, b) => a + b, 0);
  const average = sum / periodLength;
  const success = average >= target;
  let rating = 1;
  let ratingDescription = "bad";

  if (success) {
    rating = 3;
    ratingDescription = "good";
  } else if (average < target) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
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
