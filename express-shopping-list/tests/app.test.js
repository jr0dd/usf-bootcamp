import { app } from '../app.js'
import request from 'supertest'
import { default as items } from '../fakeDb.js'

beforeEach(async () => {
  items.push({ name: 'pickles', price: Number(5.50).toFixed(2) })
})

afterEach(async () => {
  items.length = 0
})

describe('basic items get/post', () => {
  test('test get', async () => {
    const res = await request(app).get('/items')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
  })

  test('test post', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'cookies', price: 3 })
    const obj = JSON.parse(res.body.added)
    expect(res.statusCode).toBe(200)
    expect(obj.name).toBe('cookies')
    expect(obj.price).toBe('3.00')
  })

  test('test post errors', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'pickles', price: 3 })
    expect(res.statusCode).toBe(400)
  })
})

describe('specific items get/patch/delete', () => {
  test('test get', async () => {
    const res = await request(app).get('/items/pickles')
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toEqual('pickles')
    expect(res.body.price).toEqual('5.50')
  })

  test('test get errors', async () => {
    const res = await request(app).get('/items/cookies')
    expect(res.statusCode).toBe(404)
  })

  test('test patch', async () => {
    const res = await request(app)
      .patch('/items/pickles')
      .send({ price: 2.00})
    const obj = JSON.parse(res.body.updated)
    expect(res.statusCode).toBe(200)
    expect(obj.name).toEqual('pickles')
    expect(obj.price).toEqual('2.00')
  })

  test('test patch errors', async () => {
    const res = await request(app)
      .patch('/items/cookies')
      .send({ price: 2.00})
    expect(res.statusCode).toBe(404)
  })

  test('test delete', async () => {
    const res = await request(app).delete('/items/pickles')
    expect(res.statusCode).toBe(200)
    const get = await request(app).get('/items')
    expect(get.body).toHaveLength(0)
  })

  test('test delete errors', async () => {
    const res = await request(app).delete('/items/cookies')
    expect(res.statusCode).toBe(404)
  })
})
