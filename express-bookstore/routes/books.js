import express from 'express'
import jsonschema from 'jsonschema'
import { Book } from '../models/Book.js'
import bookSchema from '../schemas/books.json' assert { type : 'json' }
const router = new express.Router()

/** GET / => {books: [book, ...]}  */

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll(req.query)
    return res.json({ books })
  } catch (err) {
    return next(err)
  }
})

/** GET /[id]  => {book: book} */

router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findOne(req.params.id)
    return res.json({ book })
  } catch (err) {
    return next(err)
  }
})

/** POST /   bookData => {book: newBook}  */

router.post('/', async (req, res, next) => {
  try {
    const result = jsonschema.validate(req.body, bookSchema)
    if (!result.valid) {
      const errors = result.errors.map(error => error.stack)
      throw new ExpressError(errors, 400)
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
    const result = jsonschema.validate(req.body, bookSchema)
    if (!result.valid) {
      const errors = result.errors.map(error => error.stack)
      throw new ExpressError(errors, 400)
    }
    const book = await Book.update(req.params.isbn, req.body)
    return res.json({ book })
  } catch (err) {
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
