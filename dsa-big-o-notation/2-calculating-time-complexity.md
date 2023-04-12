```javascript
const logUpTo = (n) => {
  for (let i = 1; i <= n; i++) {
    console.log(i)
  }
}
```
Time Complexity: O(n)

---
---
```javascript
const logAtLeast10 = (n) => {
  for (let i = 1; i <= Math.max(n, 10); i++) {
    console.log(i)
  }
}
```
Time Complexity: O(n)

---
---
```javascript
const logAtMost10 = (n) => {
  for (let i = 1; i <= Math.min(n, 10); i++) {
    console.log(i)
  }
}
```
Time Complexity: O(1)

---
---

```javascript
const onlyElementsAtEvenIndex = (array) => {
  let newArray = []
  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      newArray.push(array[i])
    }
  }
  return newArray
}
```
Time Complexity: O(n)

---
---
```javascript
const subtotals = (array) => {
  let subtotalArray = []
  for (let i = 0; i < array.length; i++) {
    let subtotal = 0
    for (let j = 0; j <= i; j++) {
      subtotal += array[j]
    }
    subtotalArray.push(subtotal)
  }
  return subtotalArray
}
```
Time Complexity: O(n^2)

---
---
```javascript
const vowelCount = (str) => {
  let vowelCount = {}
  const vowels = 'aeiouAEIOU'

  for (let char of str) {
    if(vowels.includes(char)) {
      if(char in vowelCount) {
        vowelCount[char] += 1
      } else {
        vowelCount[char] = 1
      }
    }
  }

  return vowelCount
}
```
Time Complexity: O(n)

---
---