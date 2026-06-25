import {getToken} from '../utils/token.js'

export function workoutCommand(program) {
    program
        .command('workout-log')
        .option('--date <date>', 'Date for entry')
        .option('--notes <notes>', 'Note')
        .action(async (options) => {
        const res = await fetch('http://localhost:3000/workouts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}`},
        body: JSON.stringify({ date: options.date, notes: options.notes })
    })
        const data = await res.json()
        console.log('Workout logged:', JSON.stringify(data, null, 2))
    })

    program
        .command('workout-sets')
        .option('--id <id>', 'Workout session ID')
        .option('--exercise <exercise>', 'What excercise did you do?')
        .option('--muscle <muscle>', 'What muscle did this target?')
        .option('--sets <sets>', 'How many sets did you hit?')
        .option('--reps <reps>', 'How many reps did you do?')
        .option('--weight <weight>', 'How much weight did you do?')
        .action(async (options) => {
        const res = await fetch(`http://localhost:3000/workouts/${options.id}/sets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}`},
        body: JSON.stringify({ exercise_name: options.exercise, 
                muscle_group: options.muscle, 
                sets: options.sets, 
                reps: options.reps, 
                weight: options.weight  })
    })
        const data = await res.json()
        console.log('Sets logged:', JSON.stringify(data, null, 2))
    })

    program
        .command('workout-history')
        .option('--userid <userid>', 'Userid')
        .action(async (options) => {
        const res = await fetch(`http://localhost:3000/workouts/${options.userid}`, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
        const data = await res.json()
        console.log(JSON.stringify(data, null, 2))
    })
}

