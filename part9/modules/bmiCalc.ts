export interface BMIResult {
  height: number;
  weight: number;
  bmi: number;
  message: string;
}

export const calculateBMI = (height: number, weight: number): BMIResult => {
  const heightInM = height / 100;
  const bmi = weight / (heightInM * heightInM);

  let message;
  if (bmi < 18.5) {
    message = "Underweight";
  } else if (bmi < 25) {
    message = "Normal weight";
  } else if (bmi < 30) {
    message = "Overweight";
  } else {
    message = "Obese";
  }

  return {
    height,
    weight,
    bmi: Number(bmi.toFixed(2)),
    message,
  };
};