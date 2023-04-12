import findRotationCount from './find-rotation-count.js'

describe('#findRotationCount', () => {
  it('returns the number of rotations', () => {
    expect(findRotationCount([15, 18, 2, 3, 6, 12])).toBe(2)
    expect(findRotationCount([7, 9, 11, 12, 5])).toBe(4)
    expect(findRotationCount([7, 9, 11, 12, 15])).toBe(0)
  })
})