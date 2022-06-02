const filterOutOdds = (...args) => {
  return args.filter(num => num % 2 === 0)
}
// console.log(filterOutOdds(1,2,3,4,5))


const findMin = (...nums) => {
  return Math.min(...nums)
}
// console.log(findMin(1,4,12,-3))


const mergeObjects = (obj1, obj2) => {
  return { ...obj1, ...obj2 }
}
// console.log(mergeObjects({a:1, b:2}, {c:3, d:4}))


const doubleAndReturnArgs = (arr, ...args) => {
  return [...arr, ...args.map(arg => arg * 2)]
}
// console.log(doubleAndReturnArgs([1,2,3],4,4))


const removeRandom = (items) => {
  const random = Math.floor(Math.random() * items.length)
  return items.filter((item, idx) => idx !== random)
}
// const names = ['joe','bob','marie']
// console.log(removeRandom(names))


const extend = (array1, array2) => {
  return [...array1, ...array2]
}
// const arr1 = [1,2,3]
// const arr2 = [8,9,10]
// console.log(extend(arr1, arr2))


const addKeyVal = (obj, key, val) => {
  return { ...obj, [key]: val }
}
// const obj = { name: 'jared', age: 43 }
// console.log(addKeyVal(obj, 'active', true))


const removeKey = (obj, key) => {
  delete obj[key]
  return { ...obj }
}
// const obj = { name: 'jared', age: 43 }
// console.log(removeKey(obj, 'name'))


const combine = (obj1, obj2) => {
  return { ...obj1, ...obj2 }
}
// const obj1 = { name: 'jared', age: 43 }
// const obj2 = { role: 'devops', active: true }
// console.log(combine(obj1, obj2))


const update = (obj, key, val) => {
  return { ...obj, [key]: val }
}
// const obj = { name: 'jared', age: 43 }
// console.log(update(obj, 'age', 42))