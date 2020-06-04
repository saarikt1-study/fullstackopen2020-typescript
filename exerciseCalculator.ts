// { periodLength: 7,
//   trainingDays: 5,
//   success: false,
//   rating: 2,
//   ratingDescription: 'not too bad but could be better',
//   target: 2,
//   average: 1.9285714285714286 }

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
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))