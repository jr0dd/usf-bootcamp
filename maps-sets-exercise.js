// 1 - { 1, 2, 3, 4 }

// 2 - ref

// 3 - { [ 1, 2, 3 ] => true, [ 1, 2, 3 ] => false }

const hasDuplicate = (arr) => {
  return new Set(arr).size !== arr.length
}

const vowelCount = (str) => {
  return [...str].reduce((map, char) => {
    if ('aeiou'.includes(char)) {
      map.set(char, (map.get(char) || 0) +1)
    }
    return map
  }, new Map())
}
