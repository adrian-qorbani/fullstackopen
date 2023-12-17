interface BMIResult {
  bmi: number;
  message: string;
}

const calculateBMI = (heightInCm: number, weightInKg: number): BMIResult => {
  const heightInM = heightInCm / 100;
  const bmi = weightInKg / (heightInM * heightInM);
  
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
    bmi,
    message,
  };
};

const result = calculateBMI(178, 77);
console.log(`BMI: ${result.bmi.toFixed(2)} - ${result.message}`);

