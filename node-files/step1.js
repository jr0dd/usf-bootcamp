import fs from 'node:fs/promises'
import { argv } from 'node:process'

const cat = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf8')
    return console.log(data)
  } catch (err) {
    return console.error(`
      Error reading ${path}:
      Error: ${err.message}
    `)
  }
}

cat(argv[2])
