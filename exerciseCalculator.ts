interface parsedArgs {
  target: number,
  exerciseData: Array<number>
}

const parse = (args: Array<string>): parsedArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');

  // Remove first arguments
  args.splice(0, 2);
  // Save target to a const
  const target = Number(args.splice(0, 1));
  const numberedArray = args.map(Number);

  numberedArray.forEach(element => {
    if (isNaN(element)) {
      throw new Error('Provided values were not numbers!');
    }
  });

  if (isNaN(target)) {
      throw new Error('Provided values were not numbers!');
  }
  
  return {
    target: target,
    exerciseData: numberedArray
  };
};

interface exerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseDays: Array<number>, targetGoal: number): exerciseResults => {
  const periodLength = exerciseDays.length;
  const trainingDays = exerciseDays.filter(d => d !== 0).length;
  const target = targetGoal;
  const average = exerciseDays.reduce((acc, cur) => acc + cur, 0) / exerciseDays.length;
  const success = average > targetGoal;
  let rating;
  let ratingDescription;

  if (average < target / 2) {
    rating = 1;
    ratingDescription = 'You didn\'t do even half the work!';
  } else if (average < target) {
    rating = 2;
    ratingDescription = 'Still below your target, but getting close!';
  } else {
    rating = 3;
    ratingDescription = 'Excellent job, you met your goal!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};


try {
  const { target, exerciseData } = parse(process.argv);
  console.log(calculateExercises(exerciseData, target));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, ', e.message);
}