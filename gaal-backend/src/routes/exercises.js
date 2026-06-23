import { Router } from 'express'
import { exercises } from '../data/exercises.js'
const router = Router()
export default router

router.get('/', async (req, res) => {
    if (!req.query.search) {
        return res.status(200).send(exercises)
    }
    const filtered = exercises.filter(e => e.name.toLowerCase().includes(req.query.search.toLowerCase()))
    return res.status(200).send(filtered)

})