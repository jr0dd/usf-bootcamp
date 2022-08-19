import { app } from './app.js'
import request from 'supertest'

describe('test route data', () => {
  // afterAll(() => {
  //   app.
  // })

  test('test mean', (done) => {
    request(app)
      .get('/mean?nums=1,3,5')
      .expect(200, {
        operation: 'mean',
        value: 3
      })
      .end(done)
  })

  test('test median', (done) => {
    request(app)
      .get('/median?nums=1,3,7,9,5')
      .expect(200, {
        operation: 'median',
        value: 5
      })
      .end(done)
  })

  test('test mode', (done) => {
    request(app)
      .get('/mode?nums=1,3,5,9,3')
      .expect(200, {
        operation: 'mode',
        value: 3
      })
      .end(done)
  })
})

describe('test route errors', () => {
  test('test query values', (done) => {
    request(app)
      .get('/mode?nums=1,3,hello')
      .expect(400, {
        error: {
          message: 'hello is not a number',
          status: 400
        }
      })
      .end(done)
  })

  test('test query params', (done) => {
    request(app)
      .get('/mode')
      .expect(400, {
        error: {
          message: 'nums is a required parameter',
          status: 400
        }
      })
      .end(done)
  })
})
