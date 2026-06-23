import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
export async function assessPlateau(workoutHistory) {
    const prompt = `Given this workout history: ${JSON.stringify(workoutHistory)}, has this user's weight been the same for the past 3 weeks? Respond only in JSON with verdict and summary fields.`
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const parsed = JSON.parse(text)
    return parsed
}