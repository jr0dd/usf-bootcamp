/** BizTime express application. */
import express from 'express'
import { ExpressError } from './expressError.js'
import { router as companies } from './routes/companies.js'
import { router as industries } from './routes/industries.js'
import { router as invoices } from './routes/invoices.js'

const app = express()

app.use(express.json())
app.use('/companies', companies)
app.use('/industries', industries)
app.use('/invoices', invoices)

app.use((req, res, next) => {
  const err = new ExpressError('Not Found', 404)
  return next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)

  return res.json({
    error: err,
    message: err.message
  })
})

export { app }
