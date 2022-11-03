/** Express app for message.ly. */

import express from 'express'
import cors from 'cors'
import { authenticateJWT } from './middleware/auth'
import { ExpressError } from './expressError'
import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/users'
import { messageRoutes } from './routes/messages'
const app = express()

// allow both form-encoded and json body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// allow connections to all routes from any browser
app.use(cors())

// get auth token for all routes
app.use(authenticateJWT)

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/messages', messageRoutes)

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError('Not Found', 404)
  return next(err)
})

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  if (process.env.NODE_ENV != 'test') console.error(err.stack)

  return res.json({
    error: err,
    message: err.message
  })
})

export { app }
