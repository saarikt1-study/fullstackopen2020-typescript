import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator'
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height)) {
    res.status(400).json({
      error: "malformatted parameters"
    });
  }
  
  res.json({
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line
  const exercises: Array<number> = req.body.daily_exercises;
  // eslint-disable-next-line
  const target: number = req.body.target;

  if (!exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  }
  
  exercises.forEach(element => {
    if (isNaN(element)) {
      res.status(400).json({ error: 'malformatted parameters' });
    }
  });
  
  if (isNaN(target)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  
  res.json(calculateExercises(exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});