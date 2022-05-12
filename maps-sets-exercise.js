// 1 - { 1, 2, 3, 4 }

// 2 - ref

// 3 - { [ 1, 2, 3 ] => true, [ 1, 2, 3 ] => false }

const hasDuplicate = (arr) => {
  return new Set(arr).size !== arr.length
}

const vowelCount = (str) => {
  const m = new Map()
  const vowels = ['a', 'e', 'i', 'o', 'u']
  for (const char of str) {
    if (vowels.includes(char)) {
      m.set(char, (m.get(char) || 0) + 1)
    }
  }
  return m
}
