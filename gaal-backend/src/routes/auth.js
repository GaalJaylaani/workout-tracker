import { Router } from 'express'
import { supabase } from '../db/supabase.js'
const router = Router()
export default router

router.post('/signin', async function(req, res, next) {
  const { data, error } = await supabase.auth.signInWithPassword({
  email: req.body.email,
  password: req.body.password,
})
  if (error) {
    res.status(500).send({message: 'Server error'})
    return;
  }
  const token = data.session.access_token
  const expires_at = data.session.expires_at
  const data2 = {session: {token, expires_at}}
  res.status(200).send({data: data2})
  return;
});
