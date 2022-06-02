/* eslint-env jasmine */
describe('#doubleValues', function () {
  it('doubles values in an array', function () {
    expect(doubleValues([1, 2, 3])).toEqual([2, 4, 6])
  })
  it('works for negative numbers', function () {
    expect(doubleValues([1, -2, -3])).toEqual([2, -4, -6])
  })
})

describe('#onlyEvenValues', function () {
  it('returns a new array of only even values', function () {
    expect(onlyEvenValues([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6])
  })
})

describe('#showFirstAndLast', function () {
  it('returns an array of only the first and last characters in an array', function () {
    expect(showFirstAndLast(['elie', 'colt', 'matt', 'tim'])).toEqual([
      'ee',
      'ct',
      'mt',
      'tm'
    ])
  })
})

describe('#addKeyAndValue', function () {
  it('adds a key and value to an array of objects', function () {
    const arr = [
      { name: 'Elie' },
      { name: 'Tim' },
      { name: 'Matt' },
      { name: 'Colt' }
    ]
    const updatedArr = [
      { name: 'Elie', title: 'instructor' },
      { name: 'Tim', title: 'instructor' },
      { name: 'Matt', title: 'instructor' },
      { name: 'Colt', title: 'instructor' }
    ]
    expect(addKeyAndValue(arr, 'title', 'instructor')).toEqual(updatedArr)
  })
})

describe('#vowelCount', function () {
  it('returns an object with the keys as vowels and the values as the count', function () {
    expect(vowelCount('elie')).toEqual({ e: 2, i: 1 })
    expect(vowelCount('tim')).toEqual({ i: 1 })
    expect(vowelCount('matt')).toEqual({ a: 1 })
    expect(vowelCount('hmmm')).toEqual({})
    expect(vowelCount('i am awesome and so are you')).toEqual({
      i: 1,
      a: 4,
      e: 3,
      o: 3,
      u: 1
    })
  })
})

describe('#doubleValuesWithMap', function () {
  it('doubles values in an array', function () {
    expect(doubleValuesWithMap([1, 2, 3])).toEqual([2, 4, 6])
  })
  it('works for negative numbers', function () {
    expect(doubleValuesWithMap([1, -2, -3])).toEqual([2, -4, -6])
  })
})

describe('#valTimesIndex', function () {
  it('returns a new array with each value multiplied by the index', function () {
    expect(valTimesIndex([1, 2, 3])).toEqual([0, 2, 6])
  })
  it('works for negative numbers', function () {
    expect(valTimesIndex([1, -2, -3])).toEqual([0, -2, -6])
  })
})

describe('#extractKey', function () {
  it('returns a new array with the value of each key in an array objects', function () {
    const arr = [
      { name: 'Elie' },
      { name: 'Tim' },
      { name: 'Matt' },
      { name: 'Colt' }
    ]
    expect(extractKey(arr, 'name')).toEqual(['Elie', 'Tim', 'Matt', 'Colt'])
  })
})

describe('#extractFulName', function () {
  const arr = [
    { first: 'Elie', last: 'Schoppik' },
    { first: 'Tim', last: 'Garcia' },
    { first: 'Matt', last: 'Lane' },
    { first: 'Colt', last: 'Steele' }
  ]
  it('returns a new array with the value of each key in an array objects', function () {
    expect(extractFullName(arr, 'name')).toEqual([
      'Elie Schoppik',
      'Tim Garcia',
      'Matt Lane',
      'Colt Steele'
    ])
  })
})

describe('#filterByValue', function () {
  const arr = [
    { first: 'Elie', last: 'Schoppik' },
    { first: 'Tim', last: 'Garcia', isCatOwner: true },
    { first: 'Matt', last: 'Lane' },
    { first: 'Colt', last: 'Steele', isCatOwner: true }
  ]
  it('returns a new array of objects that contain a key', function () {
    expect(filterByValue(arr, 'isCatOwner')).toEqual([
      { first: 'Tim', last: 'Garcia', isCatOwner: true },
      { first: 'Colt', last: 'Steele', isCatOwner: true }
    ])
  })
})

describe('#find', function () {
  const arr = [1, 2, 3, 4, 5]
  it('returns the first value found in an array', function () {
    expect(find(arr, 3)).toEqual(3)
  })
  it('returns undefined if the value is not found', function () {
    expect(find(arr, 10)).toEqual(undefined)
  })
})

describe('#findInObj', function () {
  const arr = [
    { first: 'Elie', last: 'Schoppik' },
    { first: 'Tim', last: 'Garcia', isCatOwner: true },
    { first: 'Matt', last: 'Lane' },
    { first: 'Colt', last: 'Steele', isCatOwner: true }
  ]
  it('returns the first value found in an array', function () {
    expect(findInObj(arr, 'isCatOwner', true)).toEqual({
      first: 'Tim',
      last: 'Garcia',
      isCatOwner: true
    })
  })
  it('returns undefined if the value is not found', function () {
    expect(findInObj(arr, 'isCatOwner', false)).toEqual(undefined)
  })
})

describe('#removeVowels', function () {
  it('removes all vowels from a string', function () {
    expect(removeVowels('elie')).toEqual('l')
    expect(removeVowels('TIM')).toEqual('tm')
    expect(removeVowels('ZZZZZZ')).toEqual('zzzzzz')
  })
})

describe('#doubleOddNumbers', function () {
  it('returns an array of all odd numbers doubled', function () {
    expect(doubleOddNumbers([1, 2, 3, 4, 5])).toEqual([2, 6, 10])
    expect(doubleOddNumbers([4, 4, 4, 4, 4])).toEqual([])
  })
})
