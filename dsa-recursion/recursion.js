/** product: calculate the product of an array of numbers. */

const product = (nums, idx = 0) => {
  if (idx === nums.length) return 1
  return nums[idx] * product(nums, idx + 1)
}

/** longest: return the length of the longest word in an array of words. */

const longest = (words, idx = 0, cur = 0) => {
  if (idx === words.length) return cur
  cur = Math.max(words[idx].length, cur)
  return longest(words, idx + 1, cur)
}

/** everyOther: return a string with every other letter. */

const everyOther = (str, idx = 0, newStr = '') => {
  if (idx >= str.length) return newStr
  newStr += str[idx]
  return everyOther(str, idx + 2, newStr)
}

/** isPalindrome: checks whether a string is a palindrome or not. */

const isPalindrome = (str, idx = 0) => {
  const left = idx
  const right = str.length - idx - 1
  if (left >= right) return true
  if (str[left] !== str[right]) return false
  return isPalindrome(str, idx + 1)
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

const findIndex = (arr, val, idx = 0) => {
  if (idx === arr.length) return -1
  if (arr[idx] === val) return idx
  return findIndex(arr, val, idx + 1)
}

/** revString: return a copy of a string, but in reverse. */

const revString = (str, idx = 0, newStr = '') => {
  if (newStr.length === str.length) return newStr
  newStr += str[str.length - 1 - idx]
  return revString(str, idx + 1, newStr)
}

/** gatherStrings: given an object, return an array of all of the string values. */

const gatherStrings = (obj) => {
  const arr = []

  for (const key in obj) {
    if (typeof obj[key] === 'string') arr.push(obj[key])
    if (typeof obj[key] === 'object') arr.push(...gatherStrings(obj[key]))
  }
  return arr
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings
}
