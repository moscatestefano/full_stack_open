interface Report {
    numberOfDays: number,
    numberOfTrainingDays: number,
    originalTarget: number,
    averageTime: number,
    targetReached: boolean,
    rating: Rating,
    comment: string
}

interface Arguments {
    days: Array<number>,
    target: number
}

type Rating = 0 | 1 | 2 | 3;

const parseExeArguments = (args: Array<string>): Arguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 10) throw new Error('Too many arguments');
    
    const valueArr: Array<number> = new Array<number>();

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))
    && !isNaN(Number(args[4])) && !isNaN(Number(args[5]))
    && !isNaN(Number(args[6])) && !isNaN(Number(args[7]))
    && !isNaN(Number(args[8])) && !isNaN(Number(args[9]))) {
        valueArr.push(Number(args[2]));
        valueArr.push(Number(args[3]));
        valueArr.push(Number(args[4]));
        valueArr.push(Number(args[5]));
        valueArr.push(Number(args[6]));
        valueArr.push(Number(args[7]));
        valueArr.push(Number(args[8]));

        return {
            days: valueArr,
            target: Number(args[9])
        };

    } else {
        throw new Error("Some values are not numbers.");
    }
  };

const calculateExercises = (values: Array<number>, target: number):Report => {
    const sum: number = values.reduce((a, b) => a + b, 0);
    const numDays: number = values.filter(a => a !== 0).length;
    const avg: number = sum / numDays;
    const reached: boolean = sum >= (target * 7);
    let rate: Rating = 0;
    if (sum / (target * 7) <= 0.25)
        rate = 0;
    else if (sum / (target * 7) <= 0.50)
        rate = 1;
    else if (sum / (target * 7) <= 0.75)
        rate = 2;
    else
        rate = 3;
    let comm = "";
    switch(rate) {
        case 3: comm = "Well done!"; break;
        case 2: comm = "Great, but you could do better."; break;
        case 1: comm = "You should improve."; break;
        case 0: comm = "Leave the couch now!"; break;
    }

    return {
        numberOfDays: 7,
        numberOfTrainingDays: numDays,
        originalTarget: target,
        averageTime: avg,
        targetReached: reached,
        rating: rate,
        comment: comm
    };
};

try {
    const { days, target } = parseExeArguments(process.argv);
    console.log(calculateExercises(days, target));
} catch (error: unknown) {
    let errorMessage = "Something went wrong. ";
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

export { calculateExercises }