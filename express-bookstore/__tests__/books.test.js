/** Integration tests for books route */
import request from 'supertest'
import { app } from '../app.js'
import { db } from '../db.js'

process.env.NODE_ENV = 'test'
let isbn

beforeEach(async () => {
  const result = await db.query(`
    INSERT INTO
      books (isbn, amazon_url, author, language, pages, publisher, title, year)
      VALUES(
        '0691161518',
        'http://a.co/eobPtX2',
        'Matthew Lane',
        'english',
        264,
        'Princeton University Press',
        'Power-Up: Unlocking the Hidden Mathematics in Video Games',
        2017)
      RETURNING isbn`
  )
  isbn = result.rows[0].isbn
})

describe('POST /books', () => {
  test('create new book', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        isbn: '123456789',
        amazon_url: 'http://a.co/hdhdsh',
        author: 'joe mama',
        language: 'english',
        pages: 10,
        publisher: 'diamond',
        title: 'boring book',
        year: 2020
      })
    expect(response.statusCode).toBe(201)
    expect(response.body.book).toHaveProperty('isbn')
  })
})

describe('GET /books', () => {
  test('list books', async () => {
    const response = await request(app)
      .get('/books')
    expect(response.statusCode).toBe(200)
    expect(response.body.books).toHaveLength(1)
  })
})

describe('GET /books/:isbn', () => {
  test('get one book', async () => {
    const response = await request(app)
      .get(`/books/${isbn}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.book.isbn).toBe(isbn)
  })

  test('invalid book', async () => {
    const response = await request(app)
      .get('/books/0')
    expect(response.statusCode).toBe(404)
  })
})

describe('PUT /books/:isbn', () => {
  test('update book', async () => {
    const response = await request(app)
      .put(`/books/${isbn}`)
      .send({
        isbn: '123456789',
        amazon_url: 'http://a.co/hdhdsh',
        author: 'joe mama',
        language: 'english',
        pages: 100,
        publisher: 'diamond',
        title: 'boring book',
        year: 2020
      })
    expect(response.statusCode).toBe(200)
    expect(response.body.book.pages).toBe(100)
  })

  test('invalid update', async () => {
    const response = await request(app)
      .put(`/books/${isbn}`)
      .send({
        genre: 'boring',
        isbn: '123456789',
        amazon_url: 'http://a.co/hdhdsh',
        author: 'joe mama',
        language: 'english',
        pages: 10,
        publisher: 'diamond',
        title: 'boring book',
        year: 2020
      })
    expect(response.statusCode).toBe(400)
  })
})

// describe('DELETE /books/:id', () => {
//   test('delete a book', async () => {
//     const response = await request(app)
//       .delete(`/books/${isbn}`)
//     expect(response.statusCode).toBe(200)
//     expect(response.body).toEqual({ message: 'Book deleted' })
//   })
// })

afterEach(async () => {
  await db.query('DELETE FROM books')
})

afterAll(async () => {
  await db.end()
})
