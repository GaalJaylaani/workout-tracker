import { supabase } from '../db/supabase.js'

export default async function(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).send("No token provided")
    }
    const token = authHeader.split(' ')[1]

    const { data, error } = await supabase.auth.getUser(token)
    if (error) {
        return res.status(401).send("Youre not authenicted")
    } else {
        req.user = data.user
        next()
    }
}