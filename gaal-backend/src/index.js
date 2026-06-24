import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import workoutRoutes from './routes/workouts.js'
import exerciseRoutes from './routes/exercises.js'
import plateauRoutes from './routes/plateau.js'
import authRoutes from './routes/auth.js'
import mealRoutes from './routes/meals.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/workouts', workoutRoutes)
app.use('/exercises', exerciseRoutes)
app.use('/plateau', plateauRoutes)
app.use('/auth', authRoutes)
app.use('/meals', mealRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Workout Tracker API is running' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))