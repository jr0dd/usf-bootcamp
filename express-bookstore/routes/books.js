import express from 'express'
import { Validator } from 'jsonschema'
import { Book } from '../models/Book.js'
import bookSchema from '../schemas/books.json' assert { type : 'json' }
const router = new express.Router()
const json = new Validator()

/** GET / => {books: [book, ...]}  */

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll(req.query)
    return res.json({ books })
  } catch (err) {
    return next(err)
  }
})

/** GET /[isbn]  => {book: book} */

router.get('/:isbn', async (req, res, next) => {
  try {
    const book = await Book.findOne(req.params.isbn)
    return res.json({ book })
  } catch (err) {
    return next(err)
  }
})

/** POST /   bookData => {book: newBook}  */

router.post('/', async (req, res, next) => {
  try {
    const result = json.validate(req.body, bookSchema, { allowUnknownAttributes: false })
    if (!result.valid) {
      return next({
        status: 400,
        error: result.errors.map(error => error.stack)
      })
    }
    const book = await Book.create(req.body)
    return res.status(201).json({ book })
  } catch (err) {
    return next(err)
  }
})

/** PUT /[isbn]   bookData => {book: updatedBook}  */

router.put('/:isbn', async (req, res, next) => {
  try {
    console.log(req.body)
    const result = json.validate(req.body, bookSchema, { allowUnknownAttributes: false })
    console.log(result.valid)
    if (!result.valid) {
      return next({
        status: 400,
        error: result.errors.map(error => error.stack)
      })
    }
    const book = await Book.update(req.params.isbn, req.body)
    return res.json({ book })
  } catch (err) {
    console.log(err.message)
    return next(err)
  }
})

/** DELETE /[isbn]   => {message: "Book deleted"} */

router.delete('/:isbn', async (req, res, next) => {
  try {
    await Book.remove(req.params.isbn)
    return res.json({ message: 'Book deleted' })
  } catch (err) {
    return next(err)
  }
})

export { router }
