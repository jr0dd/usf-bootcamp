/** Common config for bookstore. */

const DB_URI = (process.env.NODE_ENV === 'test')
  ? 'postgresql:///books-test'
  : process.env.DATABASE_URL || 'postgresql:///books'

export { DB_URI }
