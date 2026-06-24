import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
export async function assessPlateau(workoutHistory, mealHistory) {
    const prompt = `Given this workout history: ${JSON.stringify(workoutHistory)}, and This meal history ${JSON.stringify(mealHistory)} has this user's muscle mass been the same for the past 3 weeks? Respond only in JSON with verdict if they're progressing or plateau and summary fields of where they can improve to continue to grow such as increasing calories or a specific macro or changing a workout variation or add more sets.`
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const parsed = JSON.parse(text)
    return parsed
}

export async function analyzeMeal(imageBase64) {
    const result = await model.generateContent([
    {
        inlineData: {
            mimeType: 'image/jpeg',
            data: imageBase64
        }
    },
    { text: 'Analyze this meal image and respond only in JSON with these fields: meal_name, calories, protein, carbs, fats. No extra text or markdown.' }
])
    const text = result.response.text()
    const parsed = JSON.parse(text)
    return parsed
}