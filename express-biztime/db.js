/** Database setup for BizTime. */
import pkg from 'pg'
const { Client } = pkg

const client = new Client({
  connectionString: 'postgresql:///biztime'
})

client.connect()

export { client }
