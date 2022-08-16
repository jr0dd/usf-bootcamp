import fs from 'node:fs/promises'
import axios from 'axios'
import url from 'node:url'
import process from 'node:process'
import yargs from 'yargs'
const args = yargs(process.argv.slice(2))
const argv = args.argv

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

const catWrite = async (path, output) => {
  try {
    const data = await fs.readFile(path, 'utf8')
    await fs.writeFile(output, data, 'utf-8')
    return console.log(`no output, but ${output} contains contents of ${path}`)
  } catch (err) {
    return console.error(`
      Couldn't write ${path}:
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

const webCatWrite = async (url, output) => {
  try {
    const res = await axios.get(url)
    await fs.writeFile(output, res.data, 'utf-8')
    return console.log(`no output, but ${output} contains contents of ${url}`)
  } catch (err) {
    return console.error(`
      Error fetching ${url}:
      Error: ${err.message}
    `)
  }
}

const input = argv._[0]
const output = argv.out
if (output) {
  try {
    new URL(input)
    await webCatWrite(input, output)
  } catch (err) {
    await catWrite(input, output)
  }
} else {
  try {
    new URL(input)
    await webCat(input)
  } catch (err) {
    await cat(input)
  }
}
