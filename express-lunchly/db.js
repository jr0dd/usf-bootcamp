/** Database for lunchly */

import pg from 'pg'

const db = new pg.Client({
  connectionString: 'postgresql:///lunchly'
})

db.connect()

export { db }
