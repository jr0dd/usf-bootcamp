import express from 'express'
import { mean, median, mode } from 'mathjs'
const app = express()

app.use((req, res, next) => {
  try {
    if (!req.query.nums) {
      throw new Error('nums is a required parameter', 400)
    }
    const nums = req.query.nums.split(',')
    nums.forEach(num => {
      if (isNaN(num)) {
        throw new Error(`${num} is not a number`, 400)
      }
    })
  } catch (err) {
    next(err)
  }
  next()
})

app.get('/mean', (req, res, next) => {
  try {
    const nums = req.query.nums.split(',')
    res.status(200).json({ operation: 'mean', value: mean(nums) })
  } catch (err) {
    next(err)
  }
})

app.get('/median', (req, res, next) => {
  try {
    const nums = req.query.nums.split(',')
    res.status(200).json({ operation: 'median', value: median(nums) })
  } catch (err) {
    next(err)
  }
})

app.get('/mode', (req, res, next) => {
  try {
    const nums = req.query.nums.split(',')
    const freq = mode(nums)
    let result
    if (freq.length === 1) {
      result = Number(freq[0])
    } else {
      result = Number(...freq)
    }
    res.status(200).json({ operation: 'mode', value: result })
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  let status = err.status || 400
  const message = err.message

  return res.status(status).json({
    error: { message, status }
  })
})

export { app }