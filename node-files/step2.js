import fs from 'node:fs/promises'
import axios from 'axios'
import { argv } from 'node:process'
import { URL } from 'node:url'

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

const webCat = async (url) => {
  try {
    const res = await axios.get(url)
    return console.log(res.data)
  } catch (err) {
    return console.error(`
      Error fetching ${url}:
      Error: ${err.message}
    `)
  }
}

const path = argv[2]
try {
  new URL(path)
  await webCat(path)
} catch (err) {
  await cat(path)
}