import { Router } from 'express'
import authMiddleware from '../middleware/auth.js'
import { supabase } from '../db/supabase.js'
import { assessPlateau } from '../services/gemini.js'
const router = Router()
export default router


router.post("/assess/:userId", authMiddleware, async(req, res)  => {
    const userId = req.params.userId
    const { data, error} = await supabase
    .from('workout_sets')
    .select(`
        exercise_name,
        sets,
        reps,
        weight,
        workouts (
            date
        )
        `)
    .eq('workouts.user_id', userId)
    
    const { data: data2, error: error3 } = await supabase
    .from('meals')
    .select()
    .eq('user_id', req.params.userId)

    if (error || error3) {
        res.status(500).send("Something went wrong")
    } else {
        const verdict = await assessPlateau(data, data2)
        const { data: assessment , error: error2 } = await supabase
        .from('plateau_assessments')
        .insert({
            user_id: userId,
            assessed_at: new Date(),
            summary: verdict.summary,
            verdict: verdict.verdict
        })
        .select()

    if (error2) {
        return res.status(500).send("Couldn't save assessment")
    }

    return res.status(201).send({ data: assessment })

    }

    
})


router.get("/:userId", authMiddleware, async(req, res) => {
    const userId = req.params.userId
    const { data, error} = await supabase
    .from("plateau_assessments")
    .select()
    .eq('user_id', userId)
    .order('assessed_at', { ascending: false }).limit(1)

    if (error) {
        return res.status(404).send("Couldn't find")
    } else {
        res.status(200).send({ data: data})
    }
})

