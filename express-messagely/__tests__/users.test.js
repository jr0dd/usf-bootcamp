import { db } from '../db.js'
import { User } from '../models/User.js'
import { Message } from '../models/Message.js'

describe('Test User class', function () {
  beforeEach(async function () {
    await db.query('DELETE FROM messages')
    await db.query('DELETE FROM users')
    const u = await User.register({
      username: 'test',
      password: 'password',
      first_name: 'Test',
      last_name: 'Testy',
      phone: '+14155550000'
    })
  })

  test('can register', async function () {
    const u = await User.register({
      username: 'joel',
      password: 'password',
      first_name: 'Joel',
      last_name: 'Burton',
      phone: '+14155551212'
    })

    expect(u.username).toBe('joel')
    expect(u.password).not.toBe(undefined)
  })

  test('can authenticate', async function () {
    let isValid = await User.authenticate('test', 'password')
    expect(isValid).toBeTruthy()

    isValid = await User.authenticate('test', 'xxx')
    expect(isValid).toBeFalsy()
  })

  test('can update login timestamp', async function () {
    await db.query("UPDATE users SET last_login_at=NULL WHERE username='test'")
    const u = await User.get('test')
    expect(u.last_login_at).toBe(null)

    User.updateLoginTimestamp('test')
    const u2 = await User.get('test')
    expect(u2.last_login_at).not.toBe(null)
  })

  test('can get', async function () {
    const u = await User.get('test')
    expect(u).toEqual({
      username: 'test',
      first_name: 'Test',
      last_name: 'Testy',
      phone: '+14155550000',
      last_login_at: expect.any(Date),
      join_at: expect.any(Date)
    })
  })

  test('can get all', async function () {
    const u = await User.all()
    expect(u).toEqual([{
      username: 'test',
      first_name: 'Test',
      last_name: 'Testy',
      phone: '+14155550000'
    }])
  })
})

describe('Test messages part of User class', function () {
  beforeEach(async function () {
    await db.query('DELETE FROM messages')
    await db.query('DELETE FROM users')
    await db.query('ALTER SEQUENCE messages_id_seq RESTART WITH 1')

    const u1 = await User.register({
      username: 'test1',
      password: 'password',
      first_name: 'Test1',
      last_name: 'Testy1',
      phone: '+14155550000'
    })
    const u2 = await User.register({
      username: 'test2',
      password: 'password',
      first_name: 'Test2',
      last_name: 'Testy2',
      phone: '+14155552222'
    })
    const m1 = await Message.create({
      from_username: 'test1',
      to_username: 'test2',
      body: 'u1-to-u2'
    })
    const m2 = await Message.create({
      from_username: 'test2',
      to_username: 'test1',
      body: 'u2-to-u1'
    })
  })

  test('can get messages from user', async function () {
    const m = await User.messagesFrom('test1')
    expect(m).toEqual([{
      id: expect.any(Number),
      body: 'u1-to-u2',
      sent_at: expect.any(Date),
      read_at: null,
      to_user: {
        username: 'test2',
        first_name: 'Test2',
        last_name: 'Testy2',
        phone: '+14155552222'
      }
    }])
  })

  test('can get messages to user', async function () {
    const m = await User.messagesTo('test1')
    expect(m).toEqual([{
      id: expect.any(Number),
      body: 'u2-to-u1',
      sent_at: expect.any(Date),
      read_at: null,
      from_user: {
        username: 'test2',
        first_name: 'Test2',
        last_name: 'Testy2',
        phone: '+14155552222'
      }
    }])
  })
})

afterAll(async function () {
  await db.end()
})
