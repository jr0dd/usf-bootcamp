import _ from 'lodash'

class MarkovMachine {
  constructor(text) {
    let words = text.split(/[ \r\n]+/)
    this.words = words.filter(c => c !== "")
    this.makeChains()
  }

  makeChains() {
    const chains = new Map()

    for (let i=0; i < this.words.length; i++) {
      let firstWord = this.words[i]
      let nextWord = this.words[i+1] || null

      chains.has(firstWord)
        ? chains.get(firstWord).push(nextWord)
        : chains.set(firstWord, [nextWord])
    }

    this.chains = chains
  }

  makeText(numWords = 10) {
    const words = Array.from(this.chains)
    const random = _.sampleSize(words, numWords).flat(2)
    random.length = numWords
    const text = random.join(' ')
    return text
  }
}

export { MarkovMachine }