import { Router } from 'express'
import authMiddleware from '../middleware/auth.js'
import { supabase } from '../db/supabase.js'
const router = Router()
export default router

router.post('/', authMiddleware, async (req, res) => {
    const { data, error } = await supabase
    .from('workouts')
    .insert({ user_id: req.user.id , date: req.body.date, notes: req.body.notes })
    .select()
    .single()

    if (error) {
        res.status(500).send("Invalid Entry")
    } else {
        res.status(201).send({data: data})
    }
})


router.get('/:userId', authMiddleware, async (req, res) => {
    const userId = req.params.userId
    const { data, error } = await supabase
    .from('workouts')
    .select()
    .eq('user_id', userId)
    
    if (error) {
        res.status(500).send("Couldn't find data")
    } else {
        res.status(200).send({data: data})
    }
})

router.post('/:id/sets', authMiddleware, async (req, res) => {
    const { data, error } = await supabase
    .from('workout_sets')
    .insert({ workout_id: req.params.id , exercise_name: req.body.exercise_name, muscle_group: req.body.muscle_group, sets: req.body.sets, reps: req.body.reps, weight: req.body.weight })
    .select()
    .single()

    if (error) {
        res.status(500).send("Invalid Entry")
    } else {
        res.status(201).send({data: data})
    }
})