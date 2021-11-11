interface BMIValues {
    height: number,
    weight: number
}

const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
          height: Number(args[2]),
          weight: Number(args[3])
      };
  } else {
      throw new Error("Values are not numbers. Enter weight in KGs and height in CMs.");
  }
};

const calculateBmi = (value1: number, value2: number): string => {
    const bmi: number = value1 / ((value2 / 100) * (value2 / 100));
    console.log(bmi);
    if (bmi < 16)
        return "Underweight (Severe thinness)";
    else if (bmi < 16.9)
        return "Underweight (Moderate thinness)";
    else if (bmi <  18.4)
        return "Underweight (Mild thinness)";
    else if (bmi < 24.9)
        return "Normal (healthy weight)";
    else if (bmi < 29.9)
        return "Overweigth (Pre-obese)";
    else if (bmi < 34.9)
        return "Obese (Class I)";
    else if (bmi < 39.9)
        return "Obese (Class II)";
    else if (bmi > 40)
        return "Obese (Class III)";
    else
        return "There are problems with BMI readings.";
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = "Something went wrong. ";
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

export { calculateBmi };