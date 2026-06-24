import { Router } from 'express'
import authMiddleware from '../middleware/auth.js'
import { supabase } from '../db/supabase.js'
import { analyzeMeal, assessPlateau } from '../services/gemini.js'
const router = Router()
export default router

router.post("/analyze", authMiddleware, async (req, res) => {
    const { image } = req.body
    try {
        const result = await analyzeMeal(image)
        return res.status(200).send({ data: result })
    } catch (error) {
        return res.status(500).send("Can't analyze food")
    }

})

router.post("/", authMiddleware, async (req,res) => {
    const { data, error } = await supabase
    .from('meals')
    .insert({ user_id: req.user.id, calories: req.body.calories, protein: req.body.protein, carbs: req.body.carbs, fats: req.body.fats, meal_name: req.body.meal_name, logged_at: new Date()})
    .select()

    if (error) {
        res.status(500).send("Couldn't do it")
    } else {
        res.status(201).send({data: data})
    }

})

router.get("/:userId", authMiddleware, async (req, res) => {
    const { data, error } = await supabase
    .from('meals')
    .select()
    .eq('user_id', req.params.userId)

    if (error) {
        res.status(500).send("Couldn't do it")
    } else {
        res.status(200).send({data: data})
    }
})