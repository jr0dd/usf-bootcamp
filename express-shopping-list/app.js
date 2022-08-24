import express from 'express'
import morgan from 'morgan'
import _ from 'lodash'
import { errorHandler } from './middleware/errors.js'
import { itemRoutes } from './routes/items.js'
const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use('/items', itemRoutes)
app.use(errorHandler())

export { app }