import express from 'express';
import { calculateBmi } from './bmicalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmicalculator', (_req, res) => {
    const { height, weight} = _req.query;
    const isValid: boolean = !isNaN(Number(height)) && !isNaN(Number(weight));
    if (!isValid)
    res.send({
        error: "malformatted parameters"
    });

    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({
        weight,
        height,
        bmi
    });
});

app.get('/exercisecalculator', (_req, res) => {
    const { daily_ex, target }:any = _req.body

    if (!daily_ex || !target) {
        res.send({
            error: "missing parameters"
        })
    }

    let someNaNPresent:boolean = false
    let overallValidation:boolean

    if (daily_ex && target) {
        const exception: number = daily_ex.find((d:any) => isNaN(d))
        if (exception)
            someNaNPresent = true
        else
            someNaNPresent = false
    }

    overallValidation = !isNaN(target) && !someNaNPresent

    if (!overallValidation) {
        res.send({
            error: "malformatted parameters"
        })
    }

    const calculations = calculateExercises(daily_ex, Number(target))

    return res.json(calculations)
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});