import jwt from 'jsonwebtoken'
import express from 'express'
import { User } from '../models/User.js'
import { SECRET_KEY } from '../config.js'
import { ExpressError } from '../ExpressError.js'
const router = new express.Router()

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (await User.authenticate(username, password)) {
      const token = jwt.sign({ username }, SECRET_KEY)
      User.updateLoginTimestamp(username)
      return res.json({ token })
    } else {
      throw new ExpressError('Invalid username/password', 400)
    }
  } catch (err) {
    return next(err)
  }
})

router.post('/register', async (req, res, next) => {
  try {
    const { username } = await User.register(req.body)
    const token = jwt.sign({ username }, SECRET_KEY)
    User.updateLoginTimestamp(username)
    return res.json({ token })
  } catch (err) {
    return next(err)
  }
})

export { router }
