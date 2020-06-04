interface argsAsNumbers {
  height: number,
  weight: number
}

const parseArguments = (args: Array<string>): argsAsNumbers => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number) => {
  const heightInMetres = height/100
  const result = weight / (heightInMetres * heightInMetres)

  switch (true) {
    case (result < 15):
      return 'Very severely underweight'
    case (result < 16):
      return 'Severely underweight'
    case (result < 18.5):
      return 'Underweight'
    case (result < 25):
      return 'Normal (healthy weight)'
    case (result < 30):
      return 'Overweight'
    case (result < 35):
      return 'Obese Class I (Moderately obese)'
    case (result < 40):
      return 'Obese Class II (Severely obese)'
    default:
      return 'Obese Class III (Very severely obese)'
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (e) {
  console.log('Error, ', e.message)
}