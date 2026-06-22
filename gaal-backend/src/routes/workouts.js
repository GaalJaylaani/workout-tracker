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