import countZeroes from './count-zeroes.js'

describe('#countZeroes', () => {
  it('counts the number of zeroes', () => {
    expect(countZeroes([1, 1, 1, 1, 0, 0])).toBe(2)
    expect(countZeroes([1, 0, 0, 0, 0])).toBe(4)
    expect(countZeroes([0, 0, 0])).toBe(3)
    expect(countZeroes([1, 1, 1, 1])).toBe(0)
  })
})
