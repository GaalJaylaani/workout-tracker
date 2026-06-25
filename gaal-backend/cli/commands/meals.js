import {getToken} from '../utils/token.js'

export function mealsCommand(program) {
    program
        .command('meal-log')
        .option('--meal_name <meal_name>', 'Meal name')
        .option('--calories <calories>', 'Calories')
        .option('--protein <protein>', 'Protein')
        .option('--carbs <carbs>', 'Carbs')
        .option('--fats <fats>', 'Fats')
        .action(async (options) => {
        const res = await fetch('http://localhost:3000/meals/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}`},
        body: JSON.stringify({ calories: options.calories, protein: options.protein, carbs: options.carbs, fats: options.fats, meal_name: options.meal_name })
    })
        const data = await res.json()
        console.log('Meal logged:', JSON.stringify(data, null, 2))
    })

    program
        .command('meal-history')
        .option('--userid <userid>', 'Userid')
        .action(async (options) => {
        const res = await fetch(`http://localhost:3000/meals/${options.userid}`, {
        method: 'GET',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
        const data = await res.json()
        console.log(JSON.stringify(data, null, 2))
    })
}

