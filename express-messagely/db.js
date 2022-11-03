/** Database connection for messagely. */

import pg from 'pg'
import { DB_URI } from './config.js'

const db = new pg.Client({
  connectionString: DB_URI
})

db.connect()

export { db }
