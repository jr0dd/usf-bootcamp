import { Router } from 'express'
import _ from 'lodash'
import { ExpressError } from '../middleware/errors.js'
import { default as items } from '../fakeDb.js'
const router = new Router()

router.get('/', (req, res, next) => {
  try {
    return res.status(200).json(items)
  } catch (err) {
    return next(err)
  }
})

router.post('/', (req, res, next) => {
  try {
    const item = items.find(p => p.name === req.body.name)
    if (item === undefined) {
      const name = req.body.name
      const price = req.body.price.toFixed(2)
      const obj = { name, price }
      items.push(obj)
      return res.status(200).json({ added: JSON.stringify(obj) })
    } else {
      throw new ExpressError('Item Already exists', 400)
    }
  } catch (err) {
    return next(err)
  }
})

router.all('/:name', (req, res, next) => {
  try {
    if (!req.params.name) {
      throw new ExpressError('Bad Request', 400)
    }
    const idx = items.findIndex(p => p.name === req.params.name)
    if (idx === -1) {
      throw new ExpressError('Not Found', 404)
    }
    next()
  } catch (err) {
    return next(err)
  }
})

router.get('/:name', (req, res, next) => {
  try {
    const idx = items.findIndex(p => p.name === req.params.name)
    return res.status(200).json(items[idx])
  } catch (err) {
    return next(err)
  }
})

router.patch('/:name', (req, res, next) => {
  try {
    const idx = items.findIndex(p => p.name === req.params.name)
    const name = req.params.name
    const price = req.body.price.toFixed(2)
    const ogItem = { name: items[idx].name, price: items[idx].price }
    const newItem = { name, price }
    ogItem.name = req.params.name
    ogItem.price = req.body.price.toFixed(2)
    return res.status(200).json({ updated: JSON.stringify(newItem) })
  } catch (err) {
    return next(err)
  }
})

router.delete('/:name', (req, res, next) => {
  try {
    const idx = items.findIndex(p => p.name === req.params.name)
    items.splice(idx, 1)
    return res.status(200).json('Deleted')
  } catch (err) {
    return next(err)
  }
})

export { router as itemRoutes }