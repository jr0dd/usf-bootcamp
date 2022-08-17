const _ = require('lodash')

class MarkovMachine {
  constructor (text) {
    const words = text.split(/[ \r\n]+/)
    this.words = words.filter(c => c !== '')
    this.makeChains()
  }

  makeChains () {
    const chains = new Map()

    for (let i = 0; i < this.words.length; i++) {
      const firstWord = this.words[i]
      const nextWord = this.words[i + 1] || null

      chains.has(firstWord)
        ? chains.get(firstWord).push(nextWord)
        : chains.set(firstWord, [nextWord])
    }

    this.chains = chains
  }

  makeText (numWords = 100) {
    const words = Array.from(this.chains)
    const random = _.sampleSize(words, numWords).flat(2)
    random.length = numWords
    const text = random.join(' ')
    return text
  }
}

module.exports = { MarkovMachine }
