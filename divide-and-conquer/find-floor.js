const findFloor = (arr, num) => {
  const max = arr.length - 1
  const min = 0
  if (num < arr[min]) return -1
  if (num >= arr[max]) return arr[max]

  for (let i = 1; i < max - 1; i++) {
    if (arr[i] > num) return i
  }
}

export default findFloor
