/** Express app for Lunchly. */
import express from 'express'
import nunjucks from 'nunjucks'
import { router } from './routes.js'
const app = express()

app.use(express.urlencoded({ extended: false }))

nunjucks.configure('templates', {
  autoescape: true,
  express: app
})

app.use(router)

/** 404 handler */

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404

  // pass the error to the next piece of middleware
  return next(err)
})

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500)

  return res.render('error.html', { err })
})

export { app }
