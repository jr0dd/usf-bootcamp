/** User class for message.ly */

import bcrypt from 'bcrypt'
import { db } from '../db.js'
import { BCRYPT_WORK_FACTOR } from '../config.js'
import { ExpressError } from '../ExpressError.js'

/** User of the site. */

class User {
  static async register ({ username, password, first_name, last_name, phone }) {
    const hashed = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const query = await db.query(
      `INSERT INTO users (
        username,
        password,
        first_name,
        last_name,
        phone,
        join_at,
        last_login_at)
      VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
      RETURNING username, password, first_name, last_name, phone`,
      [username, hashed, first_name, last_name, phone]
    )

    return query.rows[0]
  }

  static async authenticate (username, password) {
    const query = await db.query(
      `SELECT password
        FROM users
        WHERE username = $1`,
      [username]
    )
    const user = query.rows[0]

    const match = await bcrypt.compare(password, user.password)
    if (match) {
      return user
    }
  }

  static async updateLoginTimestamp (username) {
    const query = await db.query(
      `UPDATE users
      SET last_login_at = current_timestamp
      WHERE username = $1
      RETURNING username`,
      [username]
    )

    if (!query.rows[0]) {
      throw new ExpressError(`No such user: ${username}`, 404)
    }
  }

  static async all () {
    const query = await db.query(
      `SELECT username,
        first_name,
        last_name,
        phone
      FROM users
      ORDER BY username`
    )

    return query.rows
  }

  static async get (username) {
    const query = await db.query(
      `SELECT username,
        first_name,
        last_name,
        phone,
        join_at,
        last_login_at
      FROM users
      WHERE username = $1`,
      [username]
    )

    if (!query.rows[0]) {
      throw new ExpressError(`No such user: ${username}`, 404)
    }

    return query.rows[0]
  }

  static async messagesFrom (username) {
    const query = await db.query(
      `SELECT m.id,
        m.to_username,
        u.first_name,
        u.last_name,
        u.phone,
        m.body,
        m.sent_at,
        m.read_at
      FROM messages AS m
      JOIN users AS u ON m.to_username = u.username
      WHERE from_username = $1`,
      [username]
    )

    const messages = query.rows.map(m => ({
      id: m.id,
      to_user: {
        username: m.to_username,
        first_name: m.first_name,
        last_name: m.last_name,
        phone: m.phone
      },
      body: m.body,
      sent_at: m.sent_at,
      read_at: m.read_at
    }))

    return messages
  }

  static async messagesTo (username) {
    const query = await db.query(
      `SELECT m.id,
        m.from_username,
        u.first_name,
        u.last_name,
        u.phone,
        m.body,
        m.sent_at,
        m.read_at
      FROM messages AS m
      JOIN users AS u ON m.from_username = u.username
      WHERE to_username = $1`,
      [username]
    )

    const messages = query.rows.map(m => ({
      id: m.id,
      from_user: {
        username: m.from_username,
        first_name: m.first_name,
        last_name: m.last_name,
        phone: m.phone
      },
      body: m.body,
      sent_at: m.sent_at,
      read_at: m.read_at
    }))

    return messages
  }
}

export { User }
