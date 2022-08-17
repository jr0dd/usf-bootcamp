import { MarkovMachine } from './markov.js'
import fs from 'node:fs/promises'
import axios from 'axios'
import { argv } from 'node:process'

const getText = (data) => {
  const markov = new MarkovMachine(data)
  return console.log(markov.makeText())
}

const urlToText = async (url) => {
  let res
  try {
    res = await axios.get(url)
  } catch (err) {
    return console.error(`Error fetching ${url}: ${err.message}`)
  }
  return getText(res.data)
}

const fileToText = async (file) => {
  try {
    const data = await fs.readFile(file, 'utf8')
    return getText(data)
  } catch (err) {
    return console.error(`Error reading ${file}: ${err.message}`)
  }
}

switch (argv[2]) {
  case 'url':
    await urlToText(argv[3])
    break;
  case 'file':
    await fileToText(argv[3])
    break;
  default:
    break;
}
