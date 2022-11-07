import express from 'express'
import { Message } from '../models/Message.js'
import { ensureLoggedIn } from '../middleware/auth.js'
import { ExpressError } from '../ExpressError.js'
const router = new express.Router()

router.get('/:id', ensureLoggedIn, async (req, res, next) => {
  try {
    const username = req.user.username
    const msg = await Message.get(req.params.id)

    if (msg.to_user.username !== username && msg.from_user.username !== username) {
      throw new ExpressError('Cannot read message', 401)
    }

    return res.json({ message: msg })
  } catch (err) {
    return next(err)
  }
})

router.post('/', ensureLoggedIn, async (req, res, next) => {
  try {
    const message = await Message.create({
      from_username: req.user.username,
      to_username: req.body.to_username,
      body: req.body.body
    })

    return res.json({ message })
  } catch (err) {
    return next(err)
  }
})

router.post('/:id/read', ensureLoggedIn, async (req, res, next) => {
  try {
    const username = req.user.username
    const msg = await Message.get(req.params.id)

    if (msg.to_user.username !== username) {
      throw new ExpressError('Cannot set this message to read', 401)
    }
    const message = await Message.markRead(req.params.id)

    return res.json({ message })
  } catch (err) {
    return next(err)
  }
})

export { router }
