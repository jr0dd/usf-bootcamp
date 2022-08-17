const { MarkovMachine } = require('./markov.js')

describe('test markov class', () => {
  let markov
  beforeEach(() => {
    markov = new MarkovMachine('the cat in the hat')
  })

  test('test words', () => {
    expect(markov.words).toEqual(['the', 'cat', 'in', 'the', 'hat'])
  })

  test('test chain length', () => {
    expect(markov.chains.size).toEqual(4)
  })

  test('test chain map', () => {
    obj = {}
    markov.chains.forEach((v, k) => {
      obj[k] = v
    })
    expect(obj).toEqual({ the: ['cat', 'hat'], cat: ['in'], in: ['the'], hat: [null] })
  })

  test('make text', () => {
    const text = markov.makeText(10)
    expect(text).not.toEqual('the cat in the hat')
  })

  test('make text length', () => {
    const text = markov.makeText(5).split(' ')
    expect(text.length).toEqual(5)
  })
})
