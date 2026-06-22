import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import workoutRoutes from './routes/workouts.js'
import exerciseRoutes from './routes/exercises.js'
import plateauRoutes from './routes/plateau.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/workouts', workoutRoutes)
app.use('/exercises', exerciseRoutes)
app.use('/plateau', plateauRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Workout Tracker API is running' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))